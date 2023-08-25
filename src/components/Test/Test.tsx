import { Link } from "react-router-dom";
import videosTest from "../../testData/videosTest";
import VideoCard from "../VideoCard/VideoCard";
import './Test.css'

export default function Test(){
  return (
    <div className="tesssst">
      <Link to='/creator/1'>123</Link>
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