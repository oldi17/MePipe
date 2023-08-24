import { useNavigate } from "react-router-dom";
import Video from "../../features/video/Video.interface";
import { useRef } from "react"
import useClickOutside from "../../hooks/useClickOutside";
import { convertVideoCreatedAt, convertVideoLength } from "../../lib/convertToHumanReadable";
import './VideoCard.css'


function VideoCard(props: { video:Video }) {
  const creatorLinkRefs = [
    useRef(null),
    useRef(null),
  ]
  const contRef = useRef(null)
  const navigate = useNavigate()
  
  useClickOutside(
    (e: Event) => {
      navigate('/' + props.video.url)
    },
    [...creatorLinkRefs],
    (e: Event) => {
      navigate('/@' + props.video.owner.name)
    },
    contRef
  )

  const videoLength = []
  videoLength.push()

  return (
    <div className="vc" ref={contRef}>
      <div className="vc--preview">
        <img className="vc--preview--img" src={props.video.img}/>
        <p className="vc--preview--time">
          {convertVideoLength(props.video.length)}
        </p>
      </div>
      <div className="vc--info">
        <img 
          className="vc--info--creator-photo" 
          src={props.video.owner.photo || ''}
          ref={creatorLinkRefs[0]}
        />
        <div className="vc--info--right">
          <p 
            className="vc--info--right--title"
            title={props.video.title}
          >
            {props.video.title}
          </p>
          <p 
            className="vc--info--right--creator-name"
            ref={creatorLinkRefs[1]}
            title={props.video.owner.name || ''}
          >
            {props.video.owner.name}
          </p>
          <p className="vc--info--right--metrics">
            Просмотры: {props.video.views} · {
              convertVideoCreatedAt(props.video.createdAt)
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard

