import Video from "../../features/video/Video.interface";
import CommentSection from "./components/CommentSection/CommentSection";
import RecomendationsSideBar from "./components/RecomendationsSideBar/RecomendationsSideBar";
import VideoDescription from "./components/VideoDescription/VideoDescription";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

import './VideoViewer.css'

function VideoViewer(props: {video: Video}) {


  return (
  <div className="vv">
    <VideoPlayer
      classNames={['vv--video-player']}
      url={props.video.url} 
    />
    <VideoDescription
      classNames={['vv--video-description']}
      video={props.video} 
    />
    <RecomendationsSideBar 
      classNames={['vv--recomendations-sidebar']}
    />
    <CommentSection 
      classNames={['vv--comment-section']}
      url={props.video.url} 
    />
  </div>
  )
}

export default VideoViewer