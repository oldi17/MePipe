
import { useEffect, useState } from "react";
import CommentSection from "./components/CommentSection/CommentSection";
import RecomendationsSideBar from "./components/RecomendationsSideBar/RecomendationsSideBar";
import VideoDescription from "./components/VideoDescription/VideoDescription";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

import './VideoViewer.css'
import { Video } from "../../global.interface";
import { getVideo } from "../../services/user.service";

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
    <RecomendationsSideBar 
      classNames={['vv--recomendations-sidebar']}
      video={video}
    />
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