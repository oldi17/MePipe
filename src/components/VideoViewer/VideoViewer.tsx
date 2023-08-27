import Video from "../../features/video/Video.interface";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

function VideoViewer(props: {video: Video}) {


  return (
    <div>
      <VideoPlayer url={props.video.url} />
    </div>
  )
}

export default VideoViewer