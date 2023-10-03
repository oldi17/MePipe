import { useEffect, useState } from "react"
import { CreatorMe, Video, VideoWithCommentsCount } from "../../../../global.interface"
import './VideosView.css'
import { getCreatorVideo, getVideoComments } from "../../../../services/user.service"
import VideoRow from "./VideoRow/VideoRow"

export default function VideosView(props:{
  creator: CreatorMe
}) {
  const [videos, setVideos] = useState<VideoWithCommentsCount[] | []>([])

  function setCommentCount(v: Video, commentsCount: number) {
    setVideos(prev => {
      const newVideos = [...prev]
      const theVideo = newVideos.find(vi => vi.url == v.url)
      if (theVideo)
        theVideo.commentsCount = commentsCount
      return newVideos
    })
  }

  useEffect(() => {
    getCreatorVideo(props.creator.name)
      .then((res) => {
        setVideos(res.data.videos)

        res.data.videos.map((v: Video) => {
          getVideoComments(v.url)
            .then((res) => {
              setCommentCount(v, res.data)
            })
          })

        })
  }, [])

  const videoCards = videos.map(v => <VideoRow video={v} key={v.url}/>)
  const headerTitles = ['Видео', 'Дата', 'Просмотры', 'Комментарии', 'Нравиться', 'Не нравиться', ]
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
    </>
  )
}

