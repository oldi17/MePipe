import { useNavigate } from "react-router-dom";
import Video from "../features/video/Video.interface";
import { useRef } from "react"
import useClickOutside from "../hooks/useClickOutside";

function VideoCard(props: { video:Video }) {
  const ownerLinkRef = useRef(null)
  const contRef = useRef(null)
  const navigate = useNavigate()
  useClickOutside(
    () => {
      navigate('/' + props.video.url)
    },
    [ownerLinkRef],
    () => {
      navigate('/@' + props.video.owner.name)
    },
    contRef
  )
  return (
    <div ref={contRef}>
      <div>
        <img src='1'/>
        <p ref={ownerLinkRef}>
          111111111111111
        </p>
      </div>
      <div>
        <img />
        <div>
          <p>
            fdsdsasdddddddddddddd
          </p>
          <p>
            gfdgasdsdsdsdsdsdsdsdsdsdsdsdsd
          </p>
          <p>
            fdhgfhadsssssss
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard