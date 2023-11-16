import { Route, Routes, useParams } from 'react-router-dom'
import './CreatorPage.css'
import { useEffect, useState } from 'react'
import { Creator } from '../../global.interface'
import { getCreatorVideo, getCreatorWithUsername, subCreator, unsubCreator } from '../../services/user.service'
import { MEDIA_CBG_URL, MEDIA_CPFP_URL } from '../../settings'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import VideosPanel from '../VideosPanel/VideosPanel'
import { Link } from 'react-router-dom'
import CreatorAbout from './components/CreatorAbout/CreatorAbout'
import { setSignFormView, setSignFormVisible } from '../../features/layout/layoutSlice'

export default function CreatorPage() {
  const params = useParams()

  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )
  
  const [creator, setCreator] = useState<Creator>()

  const dispatch = useDispatch()

  function handleSignInClick() {
		dispatch(setSignFormView({value: 'login'}))
		dispatch(setSignFormVisible({value: true}))
	}

  useEffect(() => {
    if (!params.creatorName) return
    getCreatorWithUsername(params.creatorName)
    .then(res => {
      setCreator(res.data.creator)
    })
  }, [])

  function handleSubscribe() {
    if (!creator) {
      return
    }
    if (!isLogged) {
      handleSignInClick()
      return
    }
    if (creator.issubscribed) {
      const isCancel = confirm("Вы действительно хотите отписаться от этого канала?")
      if (!isCancel) {
        return
      }
    }
    const promise = creator.issubscribed ? unsubCreator(creator.name) : subCreator(creator.name)
    promise.then(res => {
      setCreator(res.data.creator)
    })
  }

  return (
    <div className='outer'>
    {creator && <div
      className='cp'
    >
      <img 
        className='cp--cbg'
        src={MEDIA_CBG_URL + creator?.name + '.png'} />
      <div className='cp--info'>
        <img 
          className='cp--cpfp'
          src={MEDIA_CPFP_URL + creator?.name + '.png'} />
        <div className='cp--info--texts'>
          <h1
            className=''
          >{creator.name}</h1>
          <p
            className=''
          >Подписчики: {creator.subscribers}</p>
          
          <input
            className={'cp--sub_btn' + (creator.issubscribed ? '' : ' btn')}
            type='button'
            value={creator.issubscribed ? 'Вы подписаны' : 'Подписаться'}
            onClick={handleSubscribe}
          />
        </div>
      </div>
      <div
        className='cp--links'
      >
        <Link 
          className={location.pathname.split('/')[3] ? '' : 'current'}
          to={'/c/' + creator.name + '/'}>Видео
        </Link>
        <Link 
          className={location.pathname.split('/')[3] == 'about' ? 'current' : ''}
          to={'/c/' + creator.name + '/about'}>О канале
        </Link>
      </div>
      <Routes>
        <Route path='' element={<VideosPanel key={location.pathname} axiosGetter={() => getCreatorVideo(params.creatorName || '')} />} />
        <Route path='about' element={<CreatorAbout creator={creator}/>} />
      </Routes>
      
    </div>}
    </div>
  )
}