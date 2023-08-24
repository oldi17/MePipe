import './App.css'
import Header from './components/Header/Header'
import { useDispatch } from 'react-redux'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import { useEffect } from 'react'
import { setCurrentSideBarElement } from './features/layout/layoutSlice'
import { useLocation } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setCurrentSideBarElement({
      url: location.pathname
    }))
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
