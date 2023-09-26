import { CreatorMe } from "../../../../global.interface"
import './MainView.css'

export default function MainView(props:{
  creator: CreatorMe
}) {
  return (
    <>
    <div
      className=""
    >
      <h3
        className=""
      >
        Ваш канал:
        
      </h3>
      <p
        className=""
      >
      {props.creator.name}
      </p>
    </div>
    <div
      className="creator_hub--main--add_vid_cont"
    >
      <p
        className=""
      >
        Загрузить новое видео на ваш канал. 
      </p>
      <button 
        type="button" 
        onClick={() => {}}
        className=""
      >
        Добавить видео
      </button>
    </div>
    <div
      className=""
    >
      <h3
        className=""
      >
        Аналитика по каналу
      </h3>
      <p
        className=""
      >
        Подписчики: {props.creator.subscribers}
      </p>
      <p
        className=""
      >
        Просмотры: {props.creator.views}
      </p>
    </div>
    </>
  )
}