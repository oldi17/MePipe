import { Link } from "react-router-dom";
import Video from "../../features/video/Video.interface";
// import { useickOutside from "../../hooks/useClickOutside";
import { convertVideoCreatedAt, convertVideoLength } from "../../lib/convertToHumanReadable";
import './VideoCard.css'
import Thumbnail from "./components/Thumbnail";


function VideoCard(props: { 
  video:Video;
  isSmallSize?: boolean;
}) {

  return (
    <Link 
      to={'/' + props.video.url} 
      className={"vc" + (props.isSmallSize ? ' vc_small' : '')}
    >
      <Thumbnail 
        imgSrc={props.video.img}
        time={convertVideoLength(props.video.length)}
        classNames={['vc--thumbnail']}
      />
      <div className="vc--info">
        { !props.isSmallSize &&
          <Link to={'/@' + props.video.owner.name}>
          <img 
            className="vc--info--creator-photo" 
            src={props.video.owner.photo || ''}
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
          <Link to={'/@' + props.video.owner.name}>
          <p 
            className="vc--info--right--creator-name"
            title={props.video.owner.name || ''}
          >
            {props.video.owner.name}
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

