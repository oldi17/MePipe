import { useEffect, useRef, useState } from "react"
import './VideoPlayer.css'
import { Video } from "../../../../global.interface";
import { MEDIA_VIDEO_URL } from "../../../../settings";
import { setHistoryVideoTime } from "../../../../services/user.service";

function VideoPlayer(props: {
  classNames: string[];
  video: Video;
}) {
	const vidRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (vidRef.current) {
			const timestamp = props.video.timestamp || 0
			vidRef.current.addEventListener('loadstart', function() {
				this.currentTime = timestamp
			})
		}

		localStorage.setItem('time', '' + props.video.timestamp)

		const timerId = setInterval(() => {
			if (vidRef.current){
				const curr = Math.ceil(vidRef.current.currentTime)
				const currLocal = +(localStorage.getItem('time') || 0)
				if (curr !== currLocal) {
					localStorage.setItem('time', '' + curr)
					setHistoryVideoTime(props.video.url, curr)
				}
			}
		}, 5000)
		
		return () => {
			clearInterval(timerId)
			localStorage.removeItem('time')
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
				autoPlay
			>
				<source src={MEDIA_VIDEO_URL + props.video.url + '.mp4'} type="video/mp4" />
			</video>
		</section>
	)
}

export default VideoPlayer