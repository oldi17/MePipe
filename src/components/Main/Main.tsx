import { useSelector } from "react-redux"
import './Main.css'
import { RootState } from "../../store"
import SignForm from "../SignForm/SignForm"
import { Route, Routes } from "react-router-dom"
import CreatorHub from "../CreatorHub/CreatorHub"
import VideoViewer from "../VideoViewer/VideoViewer"
import VideosPanel from "../VideosPanel/VideosPanel"
import { getAllHistoryVideos, getAllVideos, getSearchVideo, getSubscriptionsVideos } from "../../services/user.service"
import NotLogged from "../NotLogged/NotLogged"
import CreatorPage from "../CreatorPage/CreatorPage"

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
        <Route path="/v/*" element={<VideoViewer key={location.pathname}  />} />
        <Route path="/c/:creatorName/*" element={<CreatorPage key={location.pathname}  />} />
        <Route path="" element={<VideosPanel key={location.pathname} axiosGetter={getAllVideos} />} />
        <Route path="results/*" element={<VideosPanel key={location.pathname} 
          axiosGetter={(page?: number) => {
            const queries = window.location.search.substring(1).split("&")[0].split('=')
            const query = queries[queries.length - 1].replace('%20', ' ')
            return getSearchVideo(query, page)
          }} />} />
        <Route 
          path="/subscriptions" 
          element={isLogged 
            ? <VideosPanel key={location.pathname} axiosGetter={getSubscriptionsVideos} /> 
            : <NotLogged />} 
          />
        <Route 
          path="/library" 
          element={isLogged 
            ? <VideosPanel key={location.pathname} axiosGetter={getAllHistoryVideos} /> 
            : <NotLogged />} 
          />
      </Routes>
      {isSignFormVisible && <SignForm classNames={[]}/>}
    </main>
  )
}

export default Main