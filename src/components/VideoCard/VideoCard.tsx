import { Link } from "react-router-dom";
import { convertVideoCreatedAt, convertVideoLength } from "../../lib/convertToHumanReadable";
import './VideoCard.css'
import Thumbnail from "./components/Thumbnail";
import { Video } from "../../global.interface";
import { MEDIA_CPFP_URL, MEDIA_THUMB_URL } from "../../settings";


function VideoCard(props: { 
  video: Video;
  isSmallSize?: boolean;
}) {

  return (
    <Link 
      to={'/v/' + props.video.url} 
      className={"vc" + (props.isSmallSize ? ' vc_small' : '')}
    >
      <Thumbnail 
        imgSrc={MEDIA_THUMB_URL + props.video.url + '.jpg'}
        time={convertVideoLength(props.video.duration)}
        classNames={['vc--thumbnail']}
      />
      <div className="vc--info">
        { !props.isSmallSize &&
          <Link to={'/c/' + props.video.creator_name}>
          <img 
            className="vc--info--creator-photo" 
            src={MEDIA_CPFP_URL + props.video.creator_name + '.png'}
          />
          </Link>
        }
        <div className="vc--info--right">
          <p 
            className="vc--info--right--title"
            title={props.video.title}
          >
            {props.video.title}
          </p>
          <Link to={'/c/' + props.video.creator_name}>
          <p 
            className="vc--info--right--creator-name"
            title={props.video.creator_name}
          >
            {props.video.creator_name}
          </p>
          </Link>
          <p className="vc--info--right--metrics">
            Просмотры: {props.video.views} · {
              convertVideoCreatedAt(props.video.createdAt)
            }
          </p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard

