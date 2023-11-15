import { VideoWithCommentsCount } from "../../../../../global.interface";
import { convertVideoLength } from "../../../../../lib/convertToHumanReadable";
import { MEDIA_THUMB_URL } from "../../../../../settings";
import Thumbnail from "../../../../VideoCard/components/Thumbnail";
import './VideoRow.css'

export default function VideoRow(props:{
  video: VideoWithCommentsCount;
  remover: Function;
  setCurrent: Function;
}) {
  function handleRemove() {
    const isCancel = confirm("Вы действительно хотите удалить это видео?")
    if (!isCancel) {
      return
    }
    props.remover()
  }

  return (
    <div
      className="video_row--cont"
      onClick={() => props.setCurrent()}
    >
    <div
      className="video_row--thumb_cont"
    >
      <Thumbnail 
          imgSrc={MEDIA_THUMB_URL + props.video.url + '.jpg?'}
          time={convertVideoLength(props.video.duration)}
          classNames={['video_row--thumbnail']}
          key={props.video.url}
      />
      <div
        className="video_row--texts"
      >
        <p
          className="video_row--texts--title"
        >
          {props.video.title}
        </p>
        <p
          className="video_row--texts--description"
        >
          {props.video.description}
        </p>
      </div>
      </div>
      <p
          className="video_row--date"
      >
        {props.video.createdAt.slice(0, 10)}
      </p>
      <p
          className="video_row--views"
      >
        {props.video.views}
      </p>
      <p
          className="video_row--views"
      >
        {props.video.commentsCount}
      </p>
      <p
          className="video_row--liked"
      >
        {props.video.likes}
      </p>
      <p
          className="video_row--disliked"
      >
        {props.video.dislikes}
      </p>
      <button
        className="video_row--remove_btn btn"
        type="button"
        onClick={e => {
          e.stopPropagation()
          handleRemove()
        }}
      >Удалить</button>
    </div>
  )
}