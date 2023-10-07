import { useState } from "react"
import './SignForm.css'
import {authLogin, authRegister} from "../../services/auth.service"
import { useDispatch } from "react-redux"
import { setSignFormView, setSignFormVisible } from "../../features/layout/layoutSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import LoginView from "./LoginView/LoginView"
import RegView from "./RegView/RegView"
import { UserReg } from "../../global.interface"

export default function SignForm(props:{classNames: string[]}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logo, setLogo] = useState<File>()

  const signForm = useSelector(
    (state: RootState) => state.layout.signForm
  )

  const dispatch = useDispatch()

  const [httpError, setHttpError] = useState('')
  const [regSuccess, setRegSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setHttpError('')
    if (signForm.view == 'login') {
      authLogin({email, password})
        .then(() => {
          handleClose()
        })
        .catch(() => {
        setHttpError('Нет доступа к серверу')
      })
    } else if (signForm.view == 'reg') {
      const user: UserReg = {username, email, password}
      if (logo)
        user['logo'] = logo
        authRegister(user).then(res => {
      
        if (res.status === 201) {
          setRegSuccess(true)
          switchView('login')
          return res
        }
      }, (err) => {
        setHttpError(errorDataToText(err.response.data))
      })
    }
  }

  function handleClose() {
    dispatch(setSignFormVisible({'value': false}))
  }

  function switchView(view: string) {
    setUsername('')
    setEmail('')
    setPassword('')
    setLogo(undefined)
    dispatch(setSignFormView({'value': view}))
  }

  function getTitle() {
    switch (signForm.view) {
      case 'login':
        return 'Авторизация'
      case 'reg':
        return 'Регистрация'
      default:
        return 'Форма'
    }
  }

  return (
    <div className="form-cont">
    <form
      onSubmit={e => handleSubmit(e)}    
      className={["form", ...props.classNames].join(' ')}
    >
      <div className="form--header">
        <span></span>
        <h3 className="form--title">{getTitle()}</h3>
        <button 
          type="button"
          className="form--btn-close"
          onClick={handleClose}
        >
          <img src="/static/btn-close.svg" />
        </button>
      </div>
      <p className="form--regSuccess">{regSuccess && 'Успешная регистрация!'}</p>
      {signForm.view == 'login' && <LoginView 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        switchToReg={() => switchView('reg')}
      />}
      {signForm.view == 'reg' && <RegView
        username={username}
        setUsername={setUsername} 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        logo={logo}
        setLogo={setLogo}
        switchToLogin={() => switchView('login')}
      />}
      <p className="form--httpError">{httpError}</p>
    </form>
    
    </div>
  )
}

function errorDataToText(data: Object) {
  let text = ''
  
  if ('email' in data)
    text += interpretateError(data['email'] as string[], 'E-mail')
  if ('username' in data)
    text += interpretateError(data['username'] as string[], 'Имя пользователя')
  if ('logo' in data)
    text += interpretateError(data['logo'] as string[], 'Изображение профиля')
  return text || 'Ошибка сервера'
}

function interpretateError(err: string[], prefix: string) {
  let res = ''
  err.map(e => {
    if (e.includes('valid'))
      res += prefix + ': Недопустимое значение\n'
    else if (e.includes('exists'))
      res += prefix + ': Уже существует\n'
  })
  return res
}