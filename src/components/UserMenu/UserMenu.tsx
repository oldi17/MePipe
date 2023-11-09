import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setUserMenu } from "../../features/layout/layoutSlice"
import { useEffect, useRef, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import './UserMenu.css'
import {authLogout} from "../../services/auth.service"
import { CreatorMe } from "../../global.interface"
import { getMeCreator } from "../../services/user.service"

function UserMenu(props: any) {
  const user = useSelector((state: RootState) => state.auth.user)
  const [creator, setCreator] = useState<CreatorMe>()
  const isCreatorMode = useSelector((state: RootState) => 
    state.layout.isCreatorMode)
  const dispatch = useDispatch()
  

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authLogout()
    dispatch(setUserMenu({'value': false}))
  }

  useEffect(() => {
    if (!user.username) {
      setCreator(undefined)
      return
    }
    getMeCreator()
      .then((res) => {
        setCreator(res.data.creator)
      })
      .catch((err) => setCreator(undefined))
  }, [])

  const userMenuRef = useRef(null)
  
  useClickOutside(
    () => dispatch(setUserMenu({'value': false})),
    [userMenuRef, ...props.exceptionRefs],
  )
  
  
	return (
		<nav className="user-menu" ref={userMenuRef}>
      <ul className="user-menu--options">
        <li><Link to={'/c/' + creator?.name}>
          <img src='/static/my-channel-icon.svg' />
          Мой канал</Link></li>
        {isCreatorMode 
          ? <li><Link to='/'>
          <img src='/static/logo-inline.svg' />
          Главная</Link></li>
          : <li><Link to='/creator/main'>
          <img src='/static/creator-icon.svg' />
          Творческая студия</Link></li>
        }
        <li><a 
          href='/logout'
          onClick={handleLogout}
        >
          <img src='/static/logout-icon.svg' />
          Выйти</a></li>
      </ul>
		</nav>
	)
}

export default UserMenu