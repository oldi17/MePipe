import { useDispatch, useSelector } from "react-redux"
import User from "../types/User"
import { useState } from "react"
import store, { RootState } from '../store'
import { login } from "../features/userSlice"
import UserMenu from "./UserMenu"


function Header() {
	// const user: User | undefined = undefined
	const user: User = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

	const [isUserMenuVisible, setIsUserMenuVisible] = useState(false)

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
							className="header--user--img"
							src={user.photo || ''}
							onClick={() => setIsUserMenuVisible(prev => !prev)}
						/>
						<h4
							className="header--user--name"
						>
							{user.name}
						</h4>
					</div>
				</div>
				{isUserMenuVisible && <UserMenu />}
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
