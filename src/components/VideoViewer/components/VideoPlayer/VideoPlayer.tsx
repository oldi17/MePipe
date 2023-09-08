import { useRef } from "react"
import video from '../../assets/2.mp4'
import './VideoPlayer.css'

function VideoPlayer(props: {
  classNames:string[];
  url:string;
}) {
	const vidRef = useRef<HTMLVideoElement>(null)
  props
	return (
		<section
			className={["video-cont", ...props.classNames].join(' ')}
		>
			<video 
				className="video"
				ref={vidRef}
				controls
			>
				<source src={video} type="video/mp4" />
			</video>
		</section>
	)
}

export default VideoPlayer