import './LoginView.css'

export default function LoginView(props: {
  email: string;
  setEmail: Function;
  password: string;
  setPassword: Function;
}) {
  return (
    <>      
      <label 
        className="login--label"
        htmlFor="email"
      >Введите e-mail
      <input 
        className="login--input-text"
        name="email"
        id="email"
        type="email" 
        value={props.email}
        placeholder="E-mail"
        onChange={e => props.setEmail(e.target.value)}
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
        value={props.password}
        placeholder="Пароль"
        minLength={8}
        onChange={e => props.setPassword(e.target.value)}
        required
      /></label>
      <button
        className="login--button"
      >
        Вход
      </button>
      <div></div>
    </>
  )
}