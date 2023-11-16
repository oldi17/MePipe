import { useEffect, useRef } from "react"
import './VideoPlayer.css'
import { Video } from "../../../../global.interface";
import { MEDIA_VIDEO_URL } from "../../../../settings";
import { setHistoryVideoTime } from "../../../../services/user.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

function VideoPlayer(props: {
  classNames: string[];
  video: Video;
}) {
	const vidRef = useRef<HTMLVideoElement>(null)
	let currPrev = props.video.timestamp || 0

	const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )

	useEffect(() => {

		function setCurr(this: HTMLVideoElement) {
			this.currentTime = currPrev
		}

		if (vidRef.current) {
			vidRef.current.addEventListener('loadedmetadata', setCurr, false)
		}

		const timerId = setInterval(() => {
			if (vidRef.current && isLogged){
				const curr = Math.floor(vidRef.current.currentTime)
				if (curr !== currPrev) {
					currPrev = curr
					setHistoryVideoTime(props.video.url, curr)
					.then(e => console.log(e.data))
				}
			}
		}, 5000)
		
		return () => {
			clearInterval(timerId)
			vidRef.current?.removeEventListener('loadedmetadata', setCurr)
		}
	}, [vidRef])

	return (
		<section
			className={["video-cont", ...props.classNames].join(' ')}
		>
			<video 
				className="video"
				ref={vidRef}
				controls
			>
				<source src={MEDIA_VIDEO_URL + props.video.url + '.mp4'} type="video/mp4" />
			</video>
		</section>
	)
}

export default VideoPlayer