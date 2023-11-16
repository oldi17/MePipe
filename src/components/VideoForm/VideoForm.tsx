import { ChangeEvent, useEffect, useState } from 'react';
import './VideoForm.css'
import { Video, VideoMod, VideoUpload } from '../../global.interface';
import { MEDIA_THUMB_URL } from '../../settings';
import { createVideo, modifyVideo } from '../../services/user.service';
import preventClickOutsideLabelElements from '../../lib/preventClickOutsideLabelElements';

export default function VideoForm(props: {
  mode: 'create' | 'edit';
  video?: Video;
  handleClose: Function;
}) {
  
  const [inputs, setInputs] = useState(props.video ? {
      url: props.video.url,
      title: props.video.title,
      description: props.video.description,
    } : {
      title: '',
      description: '',
    })
  const [thumb, setThumb] = useState<File>()
  const [video, setVideo] = useState<File>()
  const [progress, setProgress] = useState(0)
  const [handleCancelUpload, setHandleCancelUpload] = useState<Function>()
  const [disabled, setDisabled] = useState(false)

  const [thumbSrc, setThumbSrc] = useState(() => props.video 
  ? MEDIA_THUMB_URL + props.video.url + '.jpg?' 
  : '/static/file-preview.png')

  useEffect(() => {
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {document.body.style.overflow = overflow}
  }, [])

  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0])
      const video = document.getElementById('video_preview') as HTMLVideoElement
      if (video) {
        video.src = URL.createObjectURL(e.target.files[0])
      }
    }
  }

  const handleThumbFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumb(e.target.files[0])
      const thumb = document.getElementById('thumb_preview') as HTMLImageElement
      if (thumb) {
        setThumbSrc(URL.createObjectURL(e.target.files[0]))
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (props.mode == 'create') {  
      if (!video || !thumb) {
        return
      }

      setDisabled(true)
      
      const videoUp: VideoUpload = {
        title: inputs.title,
        description: inputs.description.replace(/\r/g, '\n'),
        file: video,
        thumbnail: thumb,
      }
      const ret = createVideo(videoUp, onUploadProgress)
      ret.promise
      .then(() => {
        props.handleClose()
      })
      setHandleCancelUpload(() => () => ret.controller.abort())
    } else {
      const videoMod: VideoMod = {}
      if (!props.video) {
        return
      }
      if (props.video.title !== inputs.title) {
        videoMod.title = inputs.title
      }
      if (props.video.description !== inputs.description) {
        videoMod.description = inputs.description.replace('\r', '\n')
      }
      if (thumb) {
        videoMod.thumbnail = thumb
      }
      if (!videoMod) {
        return
      }
      modifyVideo(videoMod, props.video.url)
      .then(() => {
        props.handleClose()
      })
    }
  }

  function onUploadProgress(newProgress: number) {
    setProgress(newProgress)
  }

  function handleExit() {
    if (handleCancelUpload) {
      const isCancel = confirm("Вы действительно хотите прекратить загрузку видео?")
      if (!isCancel) {
        return
      }
        handleCancelUpload()
    }
    else if (props.video && 
      (props.video.title !== inputs.title || props.video.description !== inputs.description)) {
        const isCancel = confirm("Вы действительно хотите прекратить изменение видео?")
        if (!isCancel) {
          return
        }
    } else if (!props.video && 
      (inputs.title != '' || inputs.description != '')) {
        const isCancel = confirm("Вы действительно хотите прекратить создание видео?")
        if (!isCancel) {
          return
        }
    }
    props.handleClose()
  }
  
  return (
    <>
    <div 
      className="form_cont"
      onClick={handleExit}
    >
    
    <form
      onSubmit={e => handleSubmit(e)}    
      className="video_form"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className='video_form--exit_btn'
        onClick={handleExit}
        type='button'
      >
        <img src="/static/btn-close.svg" />
      </button>
      <label 
        className="video_form--label"
        htmlFor="title"
      >Введите название видео
      <input 
        className="video_form--text_input"
        name="title"
        id="title"
        type="text" 
        value={inputs.title}
        placeholder="Название видео"
        onChange={e => setInputs(prev => ({...prev, title: e.target.value}))}
        required
        disabled={disabled}
      /></label>

      <label 
        className="video_form--label"
        htmlFor="description"
      >Введите описание видео
      <textarea 
        className="video_form--text_input"
        name="description"
        id="description"
        value={inputs.description}
        placeholder="Описание видео"
        onChange={e => setInputs(prev => ({...prev, description: e.target.value}))}
        rows={5}
        required
        disabled={disabled}
      /></label>

      <label 
        className="video_form--label"
        htmlFor="thumb"
        onClick={e => {
          preventClickOutsideLabelElements(e, 
            '.video_form--thumb_preview', 
            '.video_form--input--file')
        }}
      >Выберите изображение видео
      <img
        className='video_form--thumb_preview'
        id='thumb_preview'
        src={thumbSrc}
      />
      <input 
        className="video_form--input--file"
        name="thumb"
        id="thumb"
        type="file" 
        onChange={e => handleThumbFileChange(e)}
        accept='image/png, image/jpeg, image/webp'
        required={props.mode == 'create'}
        disabled={disabled}
      /></label>

      { props.mode == 'create' &&
      <label 
        className="video_form--label"
        htmlFor="video"
        onClick={e => {
          preventClickOutsideLabelElements(e, 
            '.video_form--video_load_btn', 
            '.video_form--input--video')
        }}
      >Выберите видео
      <div
        className='video_form--video_load_btn btn'
      >
        {video ? 'Изменить' : 'Выбрать'} видео
      </div>
      <video 
        width="320" 
        height="180" 
        id='video_preview'
        controls={!disabled && !!video}>
        Your browser does not support the video tag.
      </video>
      <input 
        className="video_form--input--video"
        name="video"
        id="video"
        type="file" 
        onChange={e => handleVideoFileChange(e)}
        accept='video/mp4, video/x-msvideo'
        required
        disabled={disabled}
      /></label>}
      <button
        className='video_form--submit_btn btn'
        disabled={disabled}
      >
        {props.mode == 'create' ? 'Загрузить' : 'Изменить'}
      </button>
      <p className='video_form--progress'>
        {progress != 0 && (progress + '% Загружено' )}
      </p>

    </form>
    
    </div>
    <div 
      id='black_screen'
      onClick={handleExit}
    ></div>
    </>
  )
}