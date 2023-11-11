
export default function LoginView(props: {
  email: string;
  setEmail: Function;
  password: string;
  setPassword: Function;
  switchToReg: Function;
}) {
  return (
    <>      
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
        placeholder="Пароль"
        minLength={8}
        onChange={e => props.setPassword(e.target.value)}
        required
      /></label>
      
      <button
        className="form--view--submit-btn btn"
      >
        Вход
      </button>
      <div>
        <button
          className="form--view--switch-to-button"
          onClick={() => props.switchToReg()}
        >
          Регистрация...
        </button>
      </div>
    </>
  )
}