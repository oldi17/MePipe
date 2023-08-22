import { Link } from "react-router-dom"
import User from "../types/User"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { logout } from "../features/userSlice"

function UserMenu() {
  const user: User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(logout())
  }
  
	return (
		<nav className="user-menu">
      <ul className="user-menu--options">
        <li><Link to={'/@' + user.name}>
          <img src='my-channel-icon.svg' />
          Мой канал</Link></li>
        <li><Link to='/creator'>
          <img src='creator-icon.svg' />
          Творческая студия</Link></li>
        <li><a 
          href='/logout'
          onClick={handleLogout}
        >
          <img src='logout-icon.svg' />
          Выйти</a></li>
      </ul>
		</nav>
	)
}

export default UserMenu