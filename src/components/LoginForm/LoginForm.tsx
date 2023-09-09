import { useState } from "react"
import './LoginForm.css'
import authService from "../../services/auth.service"

export default function LoginForm(props:{classNames: string[]}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [httpError, setHttpError] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    authService.login({email, password}).then(res => console.log(res))
  }

  return (
    <div className="login-cont">
    <form
      onSubmit={e => submit(e)}    
      className={["login", ...props.classNames].join(' ')}
      onFocus={() => setHttpError(false)}
    >
      <h3 className="login--title">Войти</h3>
      {httpError && <p>Неверные e-mail или пароль</p>}
      <label 
        className="login--label"
        htmlFor="email"
      >Введите e-mail
      <input 
        className="login--input-text"
        name="email"
        id="email"
        type="email" 
        value={email}
        placeholder="E-mail"
        onChange={e => setEmail(e.target.value)}
        required
      /></label>

      <label 
        className="login--label"
        htmlFor="password"
      >Введите пароль
      <input 
        className="login--input-text"
        name="password"
        id="password"
        type="password" 
        value={password}
        placeholder="Пароль"
        minLength={8}
        onChange={e => setPassword(e.target.value)}
        required
      /></label>
      <button
        className="login--button"
      >
        Войти
      </button>
    </form>
    </div>
  )
}

