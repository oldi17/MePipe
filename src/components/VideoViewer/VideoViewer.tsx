import Video from "../../features/video/Video.interface";
import CommentSection from "../CommentSection/CommentSection";
import RecomendationsSideBar from "../RecomendationsSideBar/RecomendationsSideBar";
import VideoDescription from "../VideoDescription/VideoDescription";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

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