import { Route, Routes, useParams } from 'react-router-dom'
import './CreatorPage.css'
import { useEffect, useState } from 'react'
import { CreatorAuthed } from '../../global.interface'
import { getCreatorVideo, getCreatorWithUsername, subCreator, unsubCreator } from '../../services/user.service'
import { MEDIA_CBG_URL, MEDIA_CPFP_URL } from '../../settings'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import VideosPanel from '../VideosPanel/VideosPanel'
import { Link } from 'react-router-dom'
import CreatorAbout from './components/CreatorAbout/CreatorAbout'

export default function CreatorPage() {
  const params = useParams()

  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )
  
  const [creator, setCreator] = useState<CreatorAuthed>()

  useEffect(() => {
    if (!params.creatorName) return
    getCreatorWithUsername(params.creatorName)
    .then(res => {
      setCreator(res.data.creator)
    })
  }, [])

  function handleSubscribe() {
    if (!creator || !isLogged) {
      return
    }
    const promise = creator.issubscribed ? unsubCreator(creator.name) : subCreator(creator.name)
    promise.then(res => {
      setCreator(res.data.creator)
    })
  }

  return (
    <>
    {creator && <>
      <img src={MEDIA_CBG_URL + creator?.name + '.jpg'} />
      <div>
        <img src={MEDIA_CPFP_URL + creator?.name + '.png'} />
        <div>
          <p>{creator.name}</p>
          <p>{creator.subscribers}</p>
          {isLogged && 
            <input
              type='button'
              value={creator.issubscribed ? 'Вы уже подписаны' : 'Подписаться'}
              onClick={handleSubscribe}
            />
          }
        </div>
      </div>
      <div>
        <Link to={'/c/' + params.creatorName + '/'}>Главная</Link>
        <Link to={'/c/' + params.creatorName + '/about'}>О канале</Link>
      </div>
      <Routes>
        <Route path='' element={<VideosPanel key={location.pathname} axiosGetter={() => getCreatorVideo(params.creatorName || '')} />} />
        <Route path='about' element={<CreatorAbout creator={creator}/>} />
      </Routes>
      
    </>}
    </>
  )
}