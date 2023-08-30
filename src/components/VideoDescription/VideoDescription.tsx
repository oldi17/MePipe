import { useEffect, useState } from 'react';
import Video from '../../features/video/Video.interface'
import './VideoDescription.css'
import PersonalizedDescription from './PersonalizedDescription.interface';

function VideoDescription(props: {
  video: Video;
  classNames: string[];
}) {
  const [personalizedDescription, setPersonalizedDescription] = useState<PersonalizedDescription>({
    subscribed: false,
    like: 'none',
  })

  const [subscribersCount, setSubscribersCount] = useState(0)

  useEffect(() => {
    setSubscribersCount(276)
  }, [])

  function handleSubscribe() {
    setPersonalizedDescription(prev => ({
      ...prev,
      subscribed: !prev.subscribed
    }))
  }

  function handleLike() {
    setPersonalizedDescription(prev => ({
      ...prev,
      like: prev.like === 'liked' ? 'none' : 'liked'
    }))
  }
  function handleDislike() {
    setPersonalizedDescription(prev => ({
      ...prev,
      like: prev.like === 'disliked' ? 'none' : 'disliked'
    }))
  }

  function handleShare() {
    navigator.clipboard.writeText(
      window.location.href
    )
  }

  return (
    <section
      className={['', ...props.classNames].join(' ')}
    >
      <div>
        <div>
          <div>
            <img src={props.video.owner.photo || ''} />
            <span>{props.video.owner.name}</span>
            <span>Подписчики: {subscribersCount}</span>
          </div>
          <input
            type='button'
            value={personalizedDescription.subscribed ? 'Вы уже подписаны' : 'Подписаться'}
            onClick={handleSubscribe}
          />
        </div>
        <div>
          <input
            type='button'
            value={(personalizedDescription.like === 'liked' ? '+' : '') 
                + props.video.likes}
            onClick={handleLike}
          />
          <input
            type='button'
            value={(personalizedDescription.like === 'disliked' ? '-' : '') 
            + props.video.dislikes}
            onClick={handleDislike}
          />
          <input
            type='button'
            value='Share'
            onClick={handleShare}
          />
        </div>
      </div>
    </section>
  )
}

export default VideoDescription