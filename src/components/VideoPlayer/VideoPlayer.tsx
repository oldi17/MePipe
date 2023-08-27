import { useRef } from "react"
import video from '../../assets/2.mp4'
import './VideoPlayer.css'

function VideoPlayer(props: {url:string}) {
	const vidRef = useRef<HTMLVideoElement>(null)

	return (
		<section
			className="video-cont"
		>
			<video 
				className="video"
				// width='1920'
				// height='720'
				ref={vidRef}
				controls
			>
				<source src={video} type="video/mp4" />
			</video>
		</section>
	)
}

export default VideoPlayer