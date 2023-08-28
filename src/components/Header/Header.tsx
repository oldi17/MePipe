import { useDispatch, useSelector } from "react-redux"
import User from "../../features/user/User.interface"
import { RootState } from '../../store'
import { login } from "../../features/user/userSlice"
import UserMenu from "../UserMenu/UserMenu"
import Layout from "../../features/layout/Layout.interface"
import { toggleUserMenu } from "../../features/layout/layoutSlice"
import { useRef, useState } from "react"
import './Header.css'
import { Link, useNavigate } from "react-router-dom"

function Header() {
	// const user: User | undefined = undefined
	const user: User = useSelector(
    (state: RootState) => state.user
  )
  const dispatch = useDispatch()
  const layout: Layout = useSelector((state: RootState) => state.layout)
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const userImgRef = useRef(null);
  
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    if (!search)
      return
    const url = (isCreatorMode ? '/creator' : '') + '/results/' + search
      navigate(url)
  }

	return (
		<header
			className="header"
		>
      <Link to='/'>
        <img 
          className="header--logo"
          src={isCreatorMode ? '/static/logo-creator.svg' : '/static/logo+name.svg'}
        />
      </Link>
			<div
				className="header--search"
			>
				<input 
					className="header--search--input"
					placeholder="Введите запрос"
          value={search}
          onChange={e => setSearch(e.target.value)}
				/>
				<button 
					type='button'
					className="header--search-btn"
          onClick={handleSearch}
				/>
			</div>
			{ user.name && 
				<>
        <div
					className="header--user"
				>
					<div
						className="header--user--info"
					>
						<img
              ref={userImgRef}
							className="header--user--img"
							src={user.photo || ''}
							onClick={() => dispatch(toggleUserMenu())}
						/>
						<h4
							className="header--user--name"
						>
							{user.name}
						</h4>
					</div>
				</div>
				{layout.isUserMenuVisible && 
          <UserMenu exceptionRefs={[userImgRef]} />}
        </>
			}
			{ !user.name && 
					<button 
						type='button'
						className="header--login-btn"
            onClick={() => dispatch(login())}
					/>
			}
		</header>
	)
}

export default Header
