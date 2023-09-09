import { useState } from "react"
import './SignForm.css'
import authService from "../../services/auth.service"
import { useDispatch } from "react-redux"
import { setSignFormVisible } from "../../features/layout/layoutSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import LoginView from "./LoginView/LoginView"

export default function SignForm(props:{classNames: string[]}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signForm = useSelector(
    (state: RootState) => state.layout.signForm
  )

  const dispatch = useDispatch()

  const [httpError, setHttpError] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setHttpError(false)
    authService.login({email, password}).then(res => {
      if (res.status === 200) {
        handleClose()
        return res
      }
      setHttpError(true)
      return Promise.reject(res)
    }, () => {
      setHttpError(true)
    })
  }

  function handleClose() {
    dispatch(setSignFormVisible({'value': false}))
  }

  return (
    <>
    <div className="login-cont">
    <form
      onSubmit={e => handleSubmit(e)}    
      className={["login", ...props.classNames].join(' ')}
      // onFocus={() => setHttpError(false)}
    >
      <div className="login--header">
        <span></span>
        <h3 className="login--title">Авторизация</h3>
        <button 
          type="button"
          className="login--btn-close"
          onClick={handleClose}
        >
          <img src="/static/btn-close.svg" />
        </button>
      </div>
      
      {signForm.view == 'login' && <LoginView 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />}
      <p className="httpError">{httpError && 'Неверные e-mail или пароль'}</p>
    </form>
    
    </div>
    </>
  )
}

