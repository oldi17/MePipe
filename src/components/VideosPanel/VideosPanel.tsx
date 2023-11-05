import { useEffect, useState } from 'react';
import './VideosPanel.css'
import { AxiosResponse } from 'axios';
import { Video } from '../../global.interface';
import VideoCard from '../VideoCard/VideoCard';
import usePaginate from '../../hooks/usePaginate';

export default function VideosPanel(props: {
  axiosGetter: (page?: number) => Promise<AxiosResponse<any, any>>;
  isRowLayout?: boolean;
  classNames?: [string];
}) {
  const [videos, setVideos] = useState<Video[]>([])
  const [getNextPage, isLoadable] = usePaginate<Video>(
    setVideos,
    props.axiosGetter,
    (v1: Video, v2: Video) => v1.url === v2.url,
    'videos'
  )

  const classNames = [
    'videos_panel--cont',
    (props.isRowLayout ? ' videos_panel--row_layout' : ''),
    ...(props.classNames ? props.classNames : []),
  ].join(' ')

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

  const videoCards = videos.map(v => <VideoCard video={v} key={v.url} isSmallSize={props.isRowLayout} />) 

  return (
    <>
    <div 
      className={classNames}>
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