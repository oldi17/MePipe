import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import VideoPlayer from './components/VideoPlayer'
import { Provider } from 'react-redux'
import store from './store'
import SideBar from './components/SideBar'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <SideBar />
        <VideoPlayer />
        <VideoPlayer />
      </BrowserRouter>
    </Provider>
  )
}

export default App
