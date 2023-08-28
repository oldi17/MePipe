import { useSelector } from "react-redux"
import Test from "../Test/Test"
import './Main.css'
import { RootState } from "../../store"

function Main() {
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  return (
    <main className={"main" + (isCreatorMode ? ' creator-mode' : '')}>
      {/* <VideoPlayer /> */}
      <Test />
    </main>
  )
}

export default Main