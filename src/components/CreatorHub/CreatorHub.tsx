import { useEffect, useState } from 'react'
import { getMeCreator } from '../../services/user.service'
import './CreatorHub.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { CreatorMe } from '../../global.interface'
import MainView from './views/MainView/MainView'
import VideosView from './views/VideosView/VideosView'
import SettingsView from './views/SettingsView/SettingsView'
import { Route, Routes, useParams } from 'react-router-dom'

export default function CreatorHub() {
  const [creator, setCreator] = useState<CreatorMe>()
  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )

  useEffect(() => {
    if (!isLogged) {
      setCreator(undefined)
      return
    }
    getMeCreator()
      .then((res) => {
        setCreator(res.data.creator)
      })
      .catch((err) => setCreator(undefined))
  }, [isLogged])

  return (
    <div>
      {!isLogged && 
        'Войдите, чтобы продолжить'}
      {isLogged && !creator &&
        <SettingsView creator={creator}/>}
      {isLogged && creator && (
        <Routes>
          <Route path="main" element={<MainView creator={creator}/>} />
          <Route path="videos" element={<VideosView creator={creator}/>} />
          <Route path="settings" element={<SettingsView creator={creator}/>} />
        </Routes>
      )}
    </div>
  )
}