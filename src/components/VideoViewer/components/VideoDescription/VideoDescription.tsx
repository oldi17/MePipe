import { useEffect, useState } from 'react';
import './VideoDescription.css'
import { CreatorAuthedWithUname, CreatorWithUname, Video, isCreatorAuthed } from '../../../../global.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { dislikeVideo, getCreatorWithUsername, likeVideo, subCreator, unlikeVideo, unsubCreator } from '../../../../services/user.service';
import { MEDIA_CPFP_URL } from '../../../../settings';
import { convertVideoCreatedAt } from '../../../../lib/convertToHumanReadable';

function VideoDescription(props: {
  video: Video;
  setVideo: Function;
  classNames: string[];
}) {

  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )

  const [creator, setCreator] = useState<CreatorAuthedWithUname|CreatorWithUname>()
  const [pfp, setPfp] = useState('')

  useEffect(() => {
    getCreatorWithUsername(props.video.creator_name)
    .then(res => {
      setCreator(res.data.creator)
      setPfp(res.data.creator.name + '.png?' + new Date().getTime())
    })
  }, [])

  function handleSubscribe() {
    if (!creator || !isCreatorAuthed(creator)) {
      return
    }
    const promise = creator.issubscribed ? unsubCreator(creator.name) : subCreator(creator.name)
    promise.then(res => {
      setCreator(res.data.creator)
      console.log(res.data.creator)

    })
  }

  function handleLike(like: 'like' | 'dislike') {
    if (!creator || !isCreatorAuthed(creator)) {
      return
    }
    const isliked = props.video.isliked
    let promise
    if (isliked === 1 && like === 'like' || isliked === -1 && like === 'dislike') {
      promise = unlikeVideo(props.video.url)
    } else if(like === 'like') {
      promise = likeVideo(props.video.url)
    } else {
      promise = dislikeVideo(props.video.url)
    }
    promise.then(res => {
      props.setVideo(res.data.video)
    })
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
        <h3>
          {props.video.title}
        </h3>
        { creator &&
        <div>
          <div>
            <img src={ MEDIA_CPFP_URL + pfp} />
            <span>{props.video.creator_name} </span>
            <span>Подписчики: {creator.subscribers}</span>
          </div>
          { isCreatorAuthed(creator) &&
          <input
            type='button'
            value={creator.issubscribed ? 'Вы уже подписаны' : 'Подписаться'}
            onClick={handleSubscribe}
          />
          }
        </div>
        }
        <div>
        { creator && isCreatorAuthed(creator) &&
          <>
          <input
            type='button'
            value={(props.video.isliked === 1 ? '+' : '') 
                + props.video.likes}
            onClick={() => handleLike('like')}
          />
          <input
            type='button'
            value={(props.video.isliked === -1 ? '-' : '') 
            + props.video.dislikes}
            onClick={() => handleLike('dislike')}

          />
          </>
        }
          <input
            type='button'
            value='Share'
            onClick={handleShare}
          />
        </div>
      </div>
      <div>
        <p>
          Просмотры: {props.video.views} Создано: {convertVideoCreatedAt(props.video.createdAt) }
        </p>
        <p>
          {props.video.description}
        </p>
      </div>
    </section>
  )
}

export default VideoDescription