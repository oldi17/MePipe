import { ChangeEvent, useState } from "react"
import { CreatorMe, CreatorMod } from "../../../../global.interface"
import './SettingsView.css'
import { modifyCreator, regCreator } from "../../../../services/user.service"
import { MEDIA_CBG_URL, MEDIA_CPFP_URL } from "../../../../settings";

export default function SettingsView(props:{
  creator: CreatorMe|undefined;
}) {
  const [newCreator, setNewCreator] = useState({...props.creator} as CreatorMe || {
    name: '',
    description: '',
    contacts: '',
  } as CreatorMe)
  const [background, setBackground] = useState<File>()
  const [pfp, setPfp] = useState<File>()
  const [serverError, setServerError] = useState('')
  const [cpfp, setCpfp] = useState(() => props.creator 
  ? MEDIA_CPFP_URL + props.creator.name + '.png?' 
  : '/static/cpfp.png')

  const [cbg, setCbg] = useState(() => props.creator 
  ? MEDIA_CBG_URL + props.creator.name + '.png?' 
  : '/static/cpfp.png')


  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setBackground(e.target.files[0])
      setCbg(URL.createObjectURL(e.target.files[0]))
    }
  }

  function handlePfpChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPfp(e.target.files[0])
      setCpfp(URL.createObjectURL(e.target.files[0]))
    }
  }
  
  function handleRegCreator() {
    regCreator(newCreator, background, pfp)
    .then(res => {
      window.location.href = window.location.origin + '/creator/main'
    })
    .catch(err => {
      setServerError(err.message)
    })
  }

  function handleModCreator() {
    if (!props.creator) return

    const modCreator: CreatorMod = {}
    if (background) {
      modCreator.channel_background = background
    }
    if (pfp) {
      modCreator.channel_pfp = pfp
    }
    if (props.creator.name !== newCreator.name) {
      modCreator.name = newCreator.name
    }
    if (props.creator.description !== newCreator.description) {
      modCreator.description = newCreator.description
    }
    if (props.creator.contacts !== newCreator.contacts) {
      modCreator.contacts = newCreator.contacts
    }
    modifyCreator(modCreator)
    .then(res => {
      window.location.href = window.location.origin + '/creator/main'
    })
    .catch(err => {
      setServerError(err.message)
    })
  }

  return (
    <form className="ch--settings_cont">  
      {!props.creator && <p className="">У вас нет канала</p>}
      <label 
        className="ch--settings--label"
        htmlFor="name"
      ><p>Введите имя канала <span className="required">*</span></p>
      <input 
        className="ch--settings--input_name"
        name="name"
        id="name"
        type="text" 
        value={newCreator.name}
        placeholder="Имя канала"
        onChange={e => setNewCreator(prev => ({...prev, name: e.target.value}))}
        required
      /></label>


      <label 
        className="ch--settings--label"
        htmlFor="description"
      >Введите описание канала
      <textarea 
        className="ch--settings--input_desc"
        name="description"
        id="description"
        value={newCreator.description}
        placeholder="Описание канала"
        rows={3}
        onChange={e => setNewCreator(prev => ({...prev, description: e.target.value}))}
      /></label>

      <label 
        className="ch--settings--label"
        htmlFor="contacts"
      >Введите контактные данные канала
      <textarea
        className="ch--settings--input_contacts"
        name="contacts"
        id="contacts"
        value={newCreator.contacts}
        placeholder="Контактные данные канала"
        rows={3}
        onChange={e => setNewCreator(prev => ({...prev, contacts: e.target.value}))}
      /></label>

      
      <label 
        className="ch--settings--label"
        htmlFor="pfp"
      >Выберите изображение профиля канала (1 x 1)
      <img 
        className="ch--settings--img_pfp"
        src={cpfp} 
      />
      <input 
        className="ch--settings--input_pfp"
        name="pfp"
        id="pfp"
        type="file" 
        onChange={handlePfpChange}
        accept='image/png, image/jpeg, image/webp'
      /></label>

      
      <label 
        className="ch--settings--label"
        htmlFor="logo"
      >Выберите фоновое изображение канала (6 x 1)
      <img 
        className="ch--settings--img_bg"
        src={cbg} />
      <input 
        className="ch--settings--input_bg"
        name="logo"
        id="logo"
        type="file" 
        onChange={handleFileChange}
        accept='image/png, image/jpeg, image/webp'
      /></label>
      <div>
        {props.creator
          ? <button
            type="button"
            className="ch--settings--btn"
            onClick={handleModCreator}
          >Изменить</button> 
          : <button
            type="button"
            className="ch--settings--btn"
            onClick={handleRegCreator}
          >Создать</button> }
      </div>
      <p
        className="ch--settings--error"
      >{serverError}</p>
    </form>
  )
}