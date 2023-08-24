import videosTest from "../testData/videosTest";
import VideoCard from "./VideoCard";

export default function Test(){
  return (
    <>
      <VideoCard video={videosTest[0]} />
    </>
  )
}