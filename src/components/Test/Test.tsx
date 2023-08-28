import videosTest from "../../testData/videosTest";
import './Test.css'
import VideoViewer from "../VideoViewer/VideoViewer";

export default function Test(){
  return (
    <div className="tesssst">
      {/* <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} /> */}
      <VideoViewer video={videosTest[0]}/>
    </div>
  )
}