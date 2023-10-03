import { ChangeEvent, useState } from "react"
import { CreatorMe, CreatorMod } from "../../../../global.interface"
import './SettingsView.css'
import { modifyCreator, regCreator } from "../../../../services/user.service"

export default function SettingsView(props:{
  creator: CreatorMe|undefined;
}) {
  const [newCreator, setNewCreator] = useState(props.creator || {
    name: '',
    description: '',
    contacts: '',
  } as CreatorMe)
  const [background, setBackground] = useState<File>()
  const [serverError, setServerError] = useState('')


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBackground(e.target.files[0])
    }
  }
  
  function handleRegCreator() {
    regCreator(newCreator, background)
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
    <>  
      {!props.creator && <p className="">У вас нет канала</p>}
      <label 
        className=""
        htmlFor="name"
      >Введите имя канала
      <input 
        className=""
        name="name"
        id="name"
        type="text" 
        value={newCreator.name}
        placeholder="Имя канала"
        onChange={e => setNewCreator(prev => ({...prev, name: e.target.value}))}
        required
      /></label>


      <label 
        className=""
        htmlFor="description"
      >Введите описание канала
      <textarea 
        className=""
        name="description"
        id="description"
        value={newCreator.description}
        placeholder="Описание канала"
        onChange={e => setNewCreator(prev => ({...prev, description: e.target.value}))}
      /></label>

      <label 
        className=""
        htmlFor="contacts"
      >Введите контактные данные канала
      <input 
        className=""
        name="contacts"
        id="contacts"
        type="text" 
        value={newCreator.contacts}
        placeholder="Контактные данные канала"
        onChange={e => setNewCreator(prev => ({...prev, contacts: e.target.value}))}
      /></label>

      <label 
        className=""
        htmlFor="logo"
      >Выберите фоновое изображение канала (6 x 1)
      <input 
        className=""
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
            className=""
            onClick={handleModCreator}
          >Изменить</button> 
          : <button
            type="button"
            className=""
            onClick={handleRegCreator}
          >Создать</button> }
      </div>
      <p
        className=""
      >{serverError}</p>
    </>
  )
}