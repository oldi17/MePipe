import { useState } from "react";
import { Video } from "../../../../global.interface";
import VideoCard from "../../../VideoCard/VideoCard";
import { getAllRecVideos } from "../../../../services/user.service";
import usePaginate from '../../../../hooks/usePaginate';
import './RecomendationsSideBar.css'

function RecomendationsSideBar(props: {
  classNames:string[];
  video: Video;
}) {
  const [videos, setVideos] = useState<Video[]>([])
  
  const [getNextPage, isLoadable] = usePaginate<Video>(
    setVideos,
    (page?: number) => getAllRecVideos(props.video.creator_name, page),
    (v1: Video, v2: Video) => v1.url === v2.url,
    'videos'
  )

  const videoCards = videos.map(v => 
    <VideoCard video={v} isSmallSize={true} key={v.url} />)

  
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