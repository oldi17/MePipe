import { useState } from "react"
import { CreatorMe } from "../../../../global.interface"
import VideoForm from "../../../VideoForm/VideoForm"
import './MainView.css'
import { Link } from "react-router-dom"

export default function MainView(props:{
  creator: CreatorMe
}) {
  const [visibility, setVisibility] = useState(false)
  return (
    <>
    <div className="ch--main-cont">
    <div
      className="ch--main--add_vid_cont"
    >
      <h3
        className="ch--main--add_vid--title"
      >
        Ваш канал:
        
      </h3>
      <Link
        className="ch--main--add_vid--cr_name"
        to={'/c/' + props.creator.name}
      >
      {props.creator.name}
      </Link>
      <p
        className="ch--main--add_vid--description"
      >
        Загрузить новое видео на ваш канал. 
      </p>
      <button 
        type="button" 
        onClick={() => setVisibility(true)}
        className="ch--main--add_vid--btn"
      >
        Добавить видео
      </button>
    </div>
    <div
      className="ch--main--analy_cont"
    >
      <h3
        className="ch--main--analy--title"
      >
        Аналитика по каналу
      </h3>
      <p
        className="ch--main--analy--subs"
      >
        Подписчики: {props.creator.subscribers}
      </p>
      <p
        className="ch--main--analy--views"
      >
        Просмотры: {props.creator.views}
      </p>
    </div>
    
    </div>
    {visibility && <VideoForm mode="create" handleClose={() => setVisibility(false)}/>}
    </>
  )
}