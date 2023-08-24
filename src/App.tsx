import './App.css'
import Header from './components/Header/Header'
import { useDispatch } from 'react-redux'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import { useEffect } from 'react'
import { setCurrentSideBarElement } from './features/layout/layoutSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCurrentSideBarElement({
      url: window.location.pathname
    }))
  }, [window.location.pathname])

  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  )
}

export default App
