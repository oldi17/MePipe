import { useSelector } from "react-redux"
import './Main.css'
import { RootState } from "../../store"
import SignForm from "../SignForm/SignForm"
import { Route, Routes } from "react-router-dom"
import CreatorHub from "../CreatorHub/CreatorHub"
import VideoViewer from "../VideoViewer/VideoViewer"
import VideosPanel from "../VideosPanel/VideosPanel"
import { getAllHistoryVideos, getAllVideos, getSubscriptionsVideos } from "../../services/user.service"
import NotLogged from "../NotLogged/NotLogged"

function Main() {
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const isSignFormVisible = useSelector(
    (state: RootState) => state.layout.signForm.visible
  )

  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )

  return (
    <main className={"main" + (isCreatorMode ? ' creator-mode' : '')}>
      <Routes>
        <Route path="/creator/*" element={isLogged ? <CreatorHub /> : <NotLogged />} />
        <Route path="/v/*" element={<VideoViewer />} />
        <Route path="" element={<VideosPanel axiosGetter={getAllVideos} />} />
        <Route path="/subscriptions" element={isLogged ? <VideosPanel axiosGetter={getSubscriptionsVideos} /> : <NotLogged />} />
        <Route path="/library" element={isLogged ? <VideosPanel axiosGetter={getAllHistoryVideos} /> : <NotLogged />} />
      </Routes>
      {isSignFormVisible && <SignForm classNames={[]}/>}
    </main>
  )
}

export default Main