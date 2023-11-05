
import { useEffect, useState } from "react";
import CommentSection from "./components/CommentSection/CommentSection";
import VideoDescription from "./components/VideoDescription/VideoDescription";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

import './VideoViewer.css'
import { Video } from "../../global.interface";
import { getAllRecVideos, getVideo } from "../../services/user.service";
import VideosPanel from "../VideosPanel/VideosPanel";

function VideoViewer() {
  const [video, setVideo] = useState<Video>()
  useEffect(() => {
    const videoUrl = window.location.pathname.replace(/(\/v\/)/, '')
    const time = (new URL(window.location.href)).searchParams.get('t')
    getVideo(videoUrl)
    .then(res => {
      setVideo({
        ...res.data.video,
        ...time ? {timestamp:time} : {}
      })
    })
  }, [])

  return (
  <div className="vv">
    { video &&
    <>
    <VideoPlayer
      classNames={['vv--video-player']}
      video={video} 
    />
    <VideoDescription
      classNames={['vv--video-description']}
      video={video}
      setVideo={setVideo}
    />
    <VideosPanel 
      axiosGetter={(page?: number) => getAllRecVideos(video.creator_name, page)}
      isRowLayout={true}
      classNames={['vv--recomendations-sidebar']} />
    <CommentSection 
      classNames={['vv--comment-section']}
      video={video}
    />
    </>
    }
  </div>
  )
}

export default VideoViewer