import videosTest from "../../testData/videosTest";
import VideoCard from "../VideoCard/VideoCard";
import './Test.css'

export default function Test(){
  return (
    <div className="tesssst">
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
      <VideoCard video={videosTest[0]} />
    </div>
  )
}