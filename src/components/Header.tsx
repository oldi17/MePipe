import { useDispatch, useSelector } from "react-redux"
import User from "../features/user/User.interface"
import { RootState } from '../store'
import { login } from "../features/user/userSlice"
import UserMenu from "./UserMenu"
import Layout from "../features/layout/Layout.interface"
import { toggleUserMenu } from "../features/layout/layoutSlice"
import { useRef } from "react"

function Header() {
	// const user: User | undefined = undefined
	const user: User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const layout: Layout = useSelector((state: RootState) => state.layout)

  const userImgRef = useRef(null);


	return (
		<header
			className="header"
		>
			<img 
				className="header--logo"
				src='logo+name.svg'
			/>
			<div
				className="header--search"
			>
				<input 
					className="header--search--input"
					placeholder="Введите запрос"
				/>
				<button 
					type='button'
					className="header--search-btn"
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
