import User from "../types/User"
import photo from '../assets/1.png'


function Header() {
	// const user: User | undefined = undefined
	const user: User | undefined = {
		name: 'oldi',
		photo: photo,
		token: '123'
	} 

	return (
		<nav
			className="header"
		>
			<div
				className="header--logo"
			>
				<img 
					className="header--logo--img"
					src='logo+name.svg'
				/>
			</div>
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
			{ user && 
				<div
					className="header--user"
				>
					<div
						className="header--user--info"
					>
						<img 
							className="header--user--img"
							src={user['photo']}
						/>
						<h4
							className="header--user--name"
						>
							{user['name']}
						</h4>
					</div>
					<button 
						type='button'
						className="header--logout-btn"
					/>
				</div>
				
			}
			{ !user && 
					<button 
						type='button'
						className="header--login-btn"
					/>
			}
		</nav>
	)
}

export default Header
