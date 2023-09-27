import { VideoWithCommentsCount } from "../../../../../global.interface";
import { convertVideoLength } from "../../../../../lib/convertToHumanReadable";
import { MEDIA_THUMB_URL } from "../../../../../settings";
import Thumbnail from "../../../../VideoCard/components/Thumbnail";
import './VideoRow.css'

export default function VideoRow(props:{
  video: VideoWithCommentsCount;
}) {
  return (
    <div
      className="video_row--cont"
    >
    <div
      className="video_row--thumb_cont"
    >
      <Thumbnail 
          imgSrc={MEDIA_THUMB_URL + props.video.url + '.jpg'}
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
    </div>
    </div>
  )
}