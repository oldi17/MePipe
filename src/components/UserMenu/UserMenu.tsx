import { Link } from "react-router-dom"
import User from "../../features/user/User.interface"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { logout } from "../../features/user/userSlice"
import { setOffUserMenu } from "../../features/layout/layoutSlice"
import { useRef } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import './UserMenu.css'

function UserMenu(props: any) {
  const user = useSelector((state: RootState) => state.user)
  const isCreatorMode = useSelector((state: RootState) => 
    state.layout.isCreatorMode)
  const dispatch = useDispatch()

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(logout())
    dispatch(setOffUserMenu())
  }

  const userMenuRef = useRef(null)
  
  useClickOutside(
    () => dispatch(setOffUserMenu()),
    [userMenuRef, ...props.exceptionRefs],
  )
  
  
	return (
		<nav className="user-menu" ref={userMenuRef}>
      <ul className="user-menu--options">
        <li><Link to={'/@' + user.name}>
          <img src='/my-channel-icon.svg' />
          Мой канал</Link></li>
        {isCreatorMode 
          ? <li><Link to='/'>
          <img src='/logo-inline.svg' />
          Главная</Link></li>
          : <li><Link to='/creator/main'>
          <img src='/creator-icon.svg' />
          Творческая студия</Link></li>
        }
        <li><a 
          href='/logout'
          onClick={handleLogout}
        >
          <img src='/logout-icon.svg' />
          Выйти</a></li>
      </ul>
		</nav>
	)
}

export default UserMenu