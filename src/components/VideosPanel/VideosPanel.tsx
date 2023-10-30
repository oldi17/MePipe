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

  function handleScroll() {
    const cont = document.querySelector('.videos_panel--cont')
    const load = document.querySelector('.videos_panel--load_btn') as HTMLElement
    if (cont && load && (window.innerHeight + window.scrollY) >= cont.getBoundingClientRect().bottom) {
      load.click()
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const videoCards = videos.map(v => <VideoCard video={v} key={v.url}/>) 

  return (
    <>
    <div className='videos_panel--cont'>
      {videoCards}
      
    </div>
    {isLoadable && 
      <button 
        className='videos_panel--load_btn'
        type='button'
        onClick={() => getNextPage()}
      >+</button>}
    </>
  )
}