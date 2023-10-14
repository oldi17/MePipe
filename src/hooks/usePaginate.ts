import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

export default function usePaginate<P>(
    setItems: React.Dispatch<React.SetStateAction<P[]>>,
    axiosGetter: (page?: number) => Promise<AxiosResponse<any, any>>,
    comparator: (p1: P, p2: P) => boolean,
    fieldName: string,
  ) : [Function, boolean] {
  const [currPage, setCurrPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isLoadable, setIsLoadable] = useState(true)

  useEffect(() => {
    getNextPage()
  }, [])

  function getNextPage() {
    if (currPage > maxPage) {
      return
    }
    const localCurrPage = currPage
    setCurrPage(maxPage + 1)
    axiosGetter(currPage)
    .then(res => {
      setItems(prev => ([
        ...prev,
        ...res.data[fieldName].filter((v: P) => !prev.find(vv => comparator(vv, v))),
      ]))
      setCurrPage(localCurrPage + 1)
      const max = +(((res.data.lastlink as string).match(/\d+$/) || [1] )[0])
      setMaxPage(max)
      if (localCurrPage == max) {
        setIsLoadable(false)
      }
    })

    
  }
  return [() => getNextPage(), isLoadable]
}