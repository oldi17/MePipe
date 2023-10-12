import { useEffect, useState } from "react";
import { Video } from "../../../../global.interface";
import VideoCard from "../../../VideoCard/VideoCard";
import { getAllRecVideos } from "../../../../services/user.service";
import './RecomendationsSideBar.css'

function RecomendationsSideBar(props: {
  classNames:string[];
  video: Video;
}) {
  const [currPage, setCurrPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoadable, setIsLoadable] = useState(true)

  useEffect(() => {
    getNextPage()
  }, [])

  const videoCards = videos.map(v => 
    <VideoCard video={v} isSmallSize={true} key={v.url} />)

  function getNextPage() {
    if (currPage > maxPage) {
      return
    }
    const localCurrPage = currPage
    setCurrPage(maxPage + 1)
    getAllRecVideos(props.video.creator_name, currPage)
    .then(res => {
      setVideos(prev => ([
        ...prev,
        ...res.data.videos.filter((v: Video) => !prev.find(vv => vv.url === v.url)),
      ]))
      setCurrPage(localCurrPage + 1)
      const max = +(((res.data.lastlink as string).match(/\d+$/) || [1] )[0])
      setMaxPage(max)
      if (localCurrPage == max) {
        setIsLoadable(false)
      }
    })
  }

  
  

  return (
    <div 
      className={[...props.classNames].join(' ')}
    >
      {videoCards}
      {isLoadable && 
      <button 
        type="button"
        onClick={() => getNextPage()}
      >+</button>}
    </div>
  )
}

export default RecomendationsSideBar