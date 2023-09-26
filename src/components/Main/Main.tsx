import { useSelector } from "react-redux"
import Test from "../Test/Test"
import './Main.css'
import { RootState } from "../../store"
import VideoCard from "../VideoCard/VideoCard"
import videosTest from "../../testData/videosTest"
import SignForm from "../SignForm/SignForm"
import { useEffect, useReducer } from "react"

function Main() {
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const isSignFormVisible = useSelector(
    (state: RootState) => state.layout.signForm.visible
  )

  return (
    <main className={"main" + (isCreatorMode ? ' creator-mode' : '')}>
      {/* <VideoPlayer /> */}
      <Test />
      {/* <VideoCard video={videosTest[0]} isSmallSize={true}/>
      <VideoCard video={videosTest[0]} /> */}
      {isSignFormVisible && <SignForm classNames={[]}/>}
    </main>
  )
}

export default Main