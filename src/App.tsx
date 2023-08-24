import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import VideoPlayer from './components/VideoPlayer'
import { Provider } from 'react-redux'
import store from './store'
import SideBar from './components/SideBar'
import Test from './components/Test'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <SideBar />
        <VideoPlayer />
        <Test />
      </BrowserRouter>
    </Provider>
  )
}

export default App
