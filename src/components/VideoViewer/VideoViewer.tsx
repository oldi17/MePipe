import Video from "../../features/video/Video.interface";
import CommentSection from "../CommentSection/CommentSection";
import RecomendationsSideBar from "../RecomendationsSideBar/RecomendationsSideBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

import './VideoViewer.css'

function VideoViewer(props: {video: Video}) {


  return (
    <>
    <div className="vv">
      <VideoPlayer
        classNames={['vv__video-player']}
        url={props.video.url} 
      />
      <RecomendationsSideBar 
        classNames={['vv__recomendations-sidebar']}
      />
    </div>
    <CommentSection 
      classNames={['vv__comment-section']}
      url={props.video.url} 
    />
    </>
  )
}

export default VideoViewer