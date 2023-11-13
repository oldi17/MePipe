import { useDispatch, useSelector } from "react-redux"
import { Auth } from "../../global.interface"
import { RootState } from '../../store'
import UserMenu from "../UserMenu/UserMenu"
import Layout from "../../features/layout/Layout.interface"
import { setSignFormView, setSignFormVisible, toggleUserMenu } from "../../features/layout/layoutSlice"
import { useRef, useState } from "react"
import './Header.css'
import { Link, useNavigate } from "react-router-dom"
import { MEDIA_PFP_URL,  } from "../../settings"

function Header() {
	const {user, isLogged}: Auth = useSelector(
    (state: RootState) => state.auth
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
    const url = '/results/?query=' + search
		window.location.href = window.location.origin + url
  }

	function handleSignInClick() {
		dispatch(setSignFormView({value: 'login'}))
		dispatch(setSignFormVisible({value: true}))
	}

	return (
		<header
			className="header"
		>
      <Link to={isCreatorMode ? '/creator/main' : '/'}>
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
			{ isLogged ? 
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
								src={MEDIA_PFP_URL + user.username + '.png?'}
								onClick={() => dispatch(toggleUserMenu())}
							/>
							<h4
								className="header--user--name"
							>
								{user.username}
							</h4>
						</div>
					</div>
					{layout.isUserMenu && 
						<UserMenu exceptionRefs={[userImgRef]} />}
				</>
				:	<button 
						type='button'
						className="header--login-btn"
            onClick={handleSignInClick}
					/>
			}
		</header>
	)
}

export default Header
