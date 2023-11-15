import { ChangeEvent, useState } from 'react';

export default function RegView(props: {
  username: string;
  setUsername: Function;
  logo: File|undefined;
  setLogo: Function;
  email: string;
  setEmail: Function;
  password: string;
  setPassword: Function;
  switchToLogin: Function;
}) {
  const [pfpSrc, setPfpSrc] = useState('/static/anon.png')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      props.setLogo(e.target.files[0])
      setPfpSrc(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <>  
      <label 
        className="form--view--label"
        htmlFor="username"
      >Введите имя пользователя
      <input 
        className="form--view--input-text"
        name="username"
        id="username"
        type="text" 
        value={props.username}
        autoComplete="off"
        placeholder="Имя пользователя"
        onChange={e => props.setUsername(e.target.value)}
        required
      /></label>

      <label 
        className="form--view--label"
        htmlFor="email"
      >Введите e-mail
      <input 
        className="form--view--input-text"
        name="email"
        id="email"
        type="email" 
        value={props.email}
        autoComplete="username"
        placeholder="E-mail"
        onChange={e => props.setEmail(e.target.value)}
        required
      /></label>

      <label 
        className="form--view--label"
        htmlFor="password"
      >Введите пароль
      <input 
        className="form--view--input-text"
        name="password"
        id="password"
        type="password" 
        value={props.password}
        autoComplete="new-password"
        placeholder="Пароль"
        minLength={8}
        onChange={e => props.setPassword(e.target.value)}
        required
      /></label>

      <label 
        className="form--view--label"
        htmlFor="logo"
        onClick={e => {
          if (e.target != document.querySelector('.form--view--pfp')
            && e.target != document.querySelector('.form--view--input-file')) {
            e.preventDefault()
          }
        }}
      >Выберите изображение профиля
      <img className="form--view--pfp" src={pfpSrc} />
      <input 
        className="form--view--input-file"
        name="logo"
        id="logo"
        type="file" 
        onChange={handleFileChange}
        accept='image/png, image/jpeg, image/webp'
      /></label>
      
      
      <button
        className="form--view--submit-btn btn"
      >
        Регистрация
      </button>
      <div>
        <button
        className="form--view--switch-to-button"
        onClick={() => props.switchToLogin()}
      >
        Вход...
      </button>
      </div>
    </>
  )
}