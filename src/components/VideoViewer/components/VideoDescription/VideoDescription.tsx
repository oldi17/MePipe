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
      className={['vd--cont', ...props.classNames].join(' ')}
    >
    <h3
      className='vd--title'
    >
      {props.video.title}
    </h3>
    <div
      className='vd--row'
    >  
        { creator &&
          <div
          className='vd--row--creator'
        > 
          <img 
            src={ MEDIA_CPFP_URL + pfp}
            className='vd--row--creator--pfp'
            />
          <div className='vd--row--creator--texts_cont'>
            <p className='vd--row--creator--texts--name'>{props.video.creator_name} </p>
            <p className='vd--row--creator--texts--subs'>Подписчики: {creator.subscribers}</p>
          </div>
          { isLogged && isCreatorAuthed(creator) &&
          <input
            className='vd--row--creator--sub_btn'
            type='button'
            value={creator.issubscribed ? 'Вы подписаны' : 'Подписаться'}
            onClick={handleSubscribe}
          />
          }
          </div>
        }
        { creator && isLogged && isCreatorAuthed(creator) &&
          <div
            className='vd--row--likes'
          >  
            <button
              type='button'
              className={'vd--row--likes--like_btn' + 
                (props.video.isliked === 1 ? ' vd--row--clicked' : '')}
              onClick={() => handleLike('like')}
            >
              {props.video.likes}
            </button>
            <button
              type='button'
              className={'vd--row--likes--dislike_btn' + 
                (props.video.isliked === -1 ? ' vd--row--clicked' : '')}
              // value={(props.video.isliked === -1 ? '-' : '') 
              // + props.video.dislikes}
              onClick={() => handleLike('dislike')}
            >
              {props.video.dislikes}
            </button>
          </div>
        }
          <button
            type='button'
            className='vd--creator--share_btn'
            onClick={handleShare}
          >
            Поделиться
          </button>
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