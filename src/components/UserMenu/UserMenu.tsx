import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setUserMenu } from "../../features/layout/layoutSlice"
import { useRef } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import './UserMenu.css'
import authService from "../../services/auth.service"

function UserMenu(props: any) {
  const user = useSelector((state: RootState) => state.auth.user)
  const isCreatorMode = useSelector((state: RootState) => 
    state.layout.isCreatorMode)
  const dispatch = useDispatch()

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authService.logout()
    dispatch(setUserMenu({'isUserMenu': false}))
  }

  const userMenuRef = useRef(null)
  
  useClickOutside(
    () => dispatch(setUserMenu({'isUserMenu': false})),
    [userMenuRef, ...props.exceptionRefs],
  )
  
  
	return (
		<nav className="user-menu" ref={userMenuRef}>
      <ul className="user-menu--options">
        <li><Link to={'/@' + user.username}>
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