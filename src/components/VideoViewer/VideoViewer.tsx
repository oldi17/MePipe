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
        classNames={['vv--video-player']}
        url={props.video.url} 
      />
      <RecomendationsSideBar 
        classNames={['vv--recomendations-sidebar']}
      />
    </div>
    <CommentSection 
      classNames={['vv--comment-section']}
      url={props.video.url} 
    />
    </>
  )
}

export default VideoViewer