import { useEffect, useState } from 'react'
import { getMeCreator } from '../../services/user.service'
import './CreatorHub.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { CreatorMe } from '../../global.interface'
import MainView from './views/MainView/MainView'
import VideosView from './views/VideosView/VideosView'
import SettingsView from './views/SettingsView/SettingsView'

export default function CreatorHub() {
  const [creator, setCreator] = useState<CreatorMe>()
  const [view, setView] = useState(<></>)
  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )
  const currentPath = useSelector(
    (state: RootState) => state.layout.currentPath
  )

  useEffect(() => {
    if (!isLogged) {
      setCreator(undefined)
      return
    }
    getMeCreator()
      .then((res) => {
        setCreator(res.data.creator)
        setViewByPath(res.data.creator, currentPath, setView)
      })
      .catch((err) => setCreator(undefined))
  }, [isLogged])

  useEffect(() => {
    if (!creator)
      return
    setViewByPath(creator, currentPath, setView)
  },[currentPath])

  return (
    <div>
      {!isLogged && 
        'Войдите, чтобы продолжить'}
      {isLogged && !creator &&
        'У вас еще нет канала'}
      {isLogged && view}
    </div>
  )
}

function setViewByPath(creator: CreatorMe, currentPath: string, setView: Function) {
    switch(currentPath) {
      case '/creator/main':
        setView(<MainView creator={creator}/>)
        break
      case '/creator/videos':
        setView(<VideosView creator={creator}/>)
        break
      case '/creator/settings':
        setView(<SettingsView creator={creator}/>)
        break
      default:
        setView(<></>)
    }
}