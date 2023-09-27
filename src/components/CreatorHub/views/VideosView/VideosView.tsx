import { useEffect, useState } from "react"
import { CreatorMe, Video, VideoWithCommentsCount } from "../../../../global.interface"
import './VideosView.css'
import { getCreatorVideo, getVideoComments } from "../../../../services/user.service"
import VideoRow from "./VideoRow/VideoRow"

export default function VideosView(props:{
  creator: CreatorMe
}) {
  const [videos, setVideos] = useState<VideoWithCommentsCount[] | []>([])

  useEffect(() => {
    getCreatorVideo(props.creator.name)
      .then((res) => {
        setVideos(res.data.videos)
        res.data.videos.map((v: Video) => {
          getVideoComments(v.url)
            .then((res) => {
              console.log(res.data)

              setVideos(prev => {
                const newVideos = [...prev]
                const theVideo = newVideos.find(vi => vi.url == v.url)
                if (theVideo)
                  theVideo.commentsCount = res.data
                return newVideos
              })
            })
          })
        })
  }, [])

  const videoCards = videos.map(v => <VideoRow video={v} />)
  const headerTitles = ['Видео', 'Дата', 'Просмотры', 'Комментарии', 'Нравиться', 'Не нравиться', ]
  const headerItems = headerTitles.map(e => (
    <p
        className="ch--videos--header--item"
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