import videosTest from "../../testData/videosTest";
import './Test.css'
import VideoViewer from "../VideoViewer/VideoViewer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SignForm from "../SignForm/SignForm";

export default function Test(){
  const isSignFormVisible = useSelector(
    (state: RootState) => state.layout.signForm.visible
  )

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
      <VideoCard video={videosTest[0]} />
      <VideoViewer video={videosTest[0]}/> */}
      {isSignFormVisible && <SignForm classNames={[]}/>}
    </div>
  )
}