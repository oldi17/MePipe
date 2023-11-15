import { useDispatch } from 'react-redux'
import { setSignFormView, setSignFormVisible } from '../../features/layout/layoutSlice'
import './NotLogged.css'

export default function NotLogged() {
  const dispatch = useDispatch()

  function handleSignInClick() {
		dispatch(setSignFormView({value: 'login'}))
		dispatch(setSignFormVisible({value: true}))
	}

  return (
    <>
      <p>Войдите, чтобы увидеть</p>
      <button
        className='btn'
        type='button'
        onClick={handleSignInClick}
      >Войти</button>
    </>
  )
}