import Video from "../../features/video/Video.interface";
import CommentSection from "../CommentSection/CommentSection";
import RecomendationsSideBar from "../RecomendationsSideBar/RecomendationsSideBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function VideoViewer(props: {video: Video}) {


  return (
    <div>
      <VideoPlayer url={props.video.url} />
      <RecomendationsSideBar />
      <CommentSection url={props.video.url} />
    </div>
  )
}

export default VideoViewer