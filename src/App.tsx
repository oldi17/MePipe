import './App.css'
import Header from './components/Header/Header'
import { useDispatch } from 'react-redux'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import { useEffect } from 'react'
import { setCurrentSideBarElement, switchToCreatorMode, switchToViewerMode } from './features/layout/layoutSlice'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  useEffect(() => {
    dispatch(setCurrentSideBarElement({
      url: location.pathname
    }))
    const isCreatorUrl = location.pathname.startsWith('/creator')
    if (isCreatorUrl && !isCreatorMode)
      dispatch(switchToCreatorMode())
    else if (!isCreatorUrl && isCreatorMode)
      dispatch(switchToViewerMode())
  }, [location])

  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  )
}

export default App
