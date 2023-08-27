import Video from "../../features/video/Video.interface";
import RecomendationsSideBar from "../RecomendationsSideBar/RecomendationsSideBar";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function VideoViewer(props: {video: Video}) {


  return (
    <div>
      <VideoPlayer url={props.video.url} />
      <RecomendationsSideBar />
    </div>
  )
}

export default VideoViewer