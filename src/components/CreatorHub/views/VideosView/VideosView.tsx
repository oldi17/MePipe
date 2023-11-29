import { useEffect, useState } from "react"
import { CreatorMe, PaginatorValues, Video, VideoWithCommentsCount, VideosResponse } from "../../../../global.interface"
import './VideosView.css'
import { getCreatorVideo, getQuery, getVideoCommentsCount, removeVideo } from "../../../../services/user.service"
import VideoRow from "./VideoRow/VideoRow"
import { BACKEND_URL_WITHOUT_SLASH } from "../../../../settings"
import VideoForm from "../../../VideoForm/VideoForm"
import Paginator from "../../../Paginator/Paginator"

export default function VideosView(props:{
  creator: CreatorMe
}) {
  const [videos, setVideos] = useState<VideoWithCommentsCount[] | []>([])
  const [paginator, setPaginator] = useState<PaginatorValues>({
    curr_page: 0,
    max_page: 0,
    firstlink: '',
    nextlink: '',
    prevlink: '',
    lastlink: '',
  })
  const [currentVideo, setCurrentVideo] = useState<Video>()
  const [videoFormIsVisible, setVideoFormIsVisible] = useState(false)

  function setCommentCount(v: Video, commentsCount: number) {
    setVideos(prev => {
      const newVideos = [...prev]
      const theVideo = newVideos.find(vi => vi.url == v.url)
      if (theVideo)
        theVideo.commentsCount = commentsCount
      return newVideos
    })
  }

  function setPaginatorFromData(data: VideosResponse) {
    setPaginator({
      curr_page: data.curr_page,
      max_page: data.max_page,
      firstlink: BACKEND_URL_WITHOUT_SLASH + data.firstlink,
      lastlink: BACKEND_URL_WITHOUT_SLASH + data.lastlink,
      nextlink: BACKEND_URL_WITHOUT_SLASH + data.nextlink,
      prevlink: BACKEND_URL_WITHOUT_SLASH + data.prevlink,
    })
  }

  function getVideos(axiosFunc: (arg: string) => Promise<{data: VideosResponse}>, arg: string) {
    axiosFunc(arg)
      .then((res) => {
        setPaginatorFromData(res.data)
        setVideos(res.data.videos)

        res.data.videos.map((v: Video) => {
          getVideoCommentsCount(v.url)
            .then((res) => {
              setCommentCount(v, res.data)
            })
          })

        })
  }

  useEffect(() => {
    getVideos(getCreatorVideo, props.creator.name)
  }, [])

  useEffect(() => {
    if(!videoFormIsVisible) {
      getVideos(getQuery, paginator.firstlink.replace(/[0-9]+$/, paginator.curr_page.toString()))
    }
  }, [videoFormIsVisible])

  function handleRemove(url: string) {
    removeVideo(url)
    .then(() => {
      setVideos(prev => {
        const newVideos = [...prev].filter(e => e.url !== url)
        return newVideos
      })
    })
  }

  const videoCards = videos.map(v => 
    <VideoRow 
      video={v} 
      key={v.url} 
      remover={() => handleRemove(v.url)} 
      setCurrent={() => {
        setCurrentVideo(v)
        setVideoFormIsVisible(true)
      }} 
    />)
  const headerTitles = ['Видео', 'Дата', 'Просмотры', 'Комментарии', 'Нравиться', 'Не нравиться', 'Удалить',]
  const headerItems = headerTitles.map(e => (
    <p
        className="ch--videos--header--item"
        key={e}
      >
        {e}
    </p>
  ))

  return (
    <>
    <div
      className="ch--videos--header"
    >
      {headerItems}
      
    </div>
    {videoCards}
    {videoFormIsVisible &&
      <VideoForm 
      mode="edit" 
      video={currentVideo} 
      handleClose={() => {
        setVideoFormIsVisible(false)
      }} />
    }
    <Paginator 
      count={paginator.curr_page} 
      max={paginator.max_page}
      handleFirst={() => getVideos(getQuery, paginator.firstlink)}
      handlePrev={() => getVideos(getQuery, paginator.prevlink)}
      handleNext={() => getVideos(getQuery, paginator.nextlink)}
      handleLast={() => getVideos(getQuery, paginator.lastlink)}
    />
    </>
  )
}

