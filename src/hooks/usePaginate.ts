import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

export default function usePaginate<P>(
    setItems: React.Dispatch<React.SetStateAction<P[]>>,
    axiosGetter: (page?: number) => Promise<AxiosResponse<any, any>>,
    comparator: (p1: P, p2: P) => boolean,
    fieldName: string,
    
  ) : [Function, boolean] {
  const [currPage, setCurrPage] = useState(0)
  const [isLoadable, setIsLoadable] = useState(true)

  useEffect(() => {
    getNextPage()
  }, [])

  function getNextPage() {
    if (!isLoadable) {
      return
    }
    setIsLoadable(false)
    axiosGetter(currPage + 1)
    .then(res => {
      setItems(prev => ([
        ...prev,
        ...res.data[fieldName].filter((v: P) => !prev.find(vv => comparator(vv, v))),
      ]))
      
      const max = +(((res.data.lastlink as string).match(/\d+$/) || [1] )[0])
      if ((currPage + 1) <= max) {
        setIsLoadable(true)
      }
      setCurrPage(prev =>  prev + 1)     
    })

    
  }
  return [() => getNextPage(), isLoadable]
}