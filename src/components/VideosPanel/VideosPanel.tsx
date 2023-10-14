import { useEffect, useState } from 'react';
import './VideosPanel.css'
import { AxiosResponse } from 'axios';
import { Video } from '../../global.interface';
import VideoCard from '../VideoCard/VideoCard';
import usePaginate from '../../hooks/usePaginate';

export default function VideosPanel(props: {
  axiosGetter: (page?: number) => Promise<AxiosResponse<any, any>>;
}) {
  
  const [videos, setVideos] = useState<Video[]>([])
  const [getNextPage, isLoadable] = usePaginate<Video>(
    setVideos,
    props.axiosGetter,
    (v1: Video, v2: Video) => v1.url === v2.url,
    'videos'
  )

  useEffect(() => {
    getNextPage()
  }, [])

  const videoCards = videos.map(v => <VideoCard video={v} key={v.url}/>) 

  return (
    <>
      {videoCards}
      {isLoadable && <button 
        type='button'
        onClick={() => getNextPage()}
      >+</button>}
    </>
  )
}