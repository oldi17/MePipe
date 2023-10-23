import { ChangeEvent, useState } from 'react';
import './VideoForm.css'
import { Video, VideoMod, VideoUpload } from '../../global.interface';
import { MEDIA_THUMB_URL } from '../../settings';
import { createVideo, modifyVideo } from '../../services/user.service';

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


  const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0])
    }
  }

  const handleThumbFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumb(e.target.files[0])
      const thumb = document.getElementById('thumb_preview') as HTMLImageElement
      if (thumb) {
        thumb.src = URL.createObjectURL(e.target.files[0])
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
        description: inputs.description,
        file: video,
        thumbnail: thumb,
      }
      const ret = createVideo(videoUp, onUploadProgress)
      ret.promise
      .then(res => {
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
        videoMod.description = inputs.description
      }
      if (thumb) {
        videoMod.thumbnail = thumb
      }
      if (!videoMod) {
        return
      }
      modifyVideo(videoMod, props.video.url)
      .then(res => {
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
    if (props.video && 
      (props.video.title !== inputs.title || props.video.description !== inputs.description)) {
        const isCancel = confirm("Вы действительно хотите прекратить изменение видео?")
        if (!isCancel) {
          return
        }
    }
    props.handleClose()
  }
  
  return (
    <div className="form_cont">
    <button
        className='video_form--exit_btn'
        onClick={handleExit}
        type='button'
      >
        X
      </button>
    <form
      onSubmit={e => handleSubmit(e)}    
      className="video_form"
    >
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
        required
        disabled={disabled}
      /></label>

      {props.video && 
      <img 
        className='video_form--thumb' 
        src={MEDIA_THUMB_URL + props.video.url + '.jpg?' + new Date().getTime()} 
      />}

      <img 
        className='video_form--thumb_preview' 
        id='thumb_preview'
      />

      <label 
        className="video_form--label"
        htmlFor="thumb"
      >Выберите изображение видео (png, jpeg, webp)
      <input 
        className="video_form--input-file"
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
      >Выберите видео (mp4, avi)
      <input 
        className="video_form--input-file"
        name="video"
        id="video"
        type="file" 
        onChange={e => handleVideoFileChange(e)}
        accept='video/mp4, video/x-msvideo'
        required
        disabled={disabled}
      /></label>}
      <button
        className='video_form--submit_btn'
        disabled={disabled}
      >
        {props.mode == 'create' ? 'Загрузить' : 'Изменить'}
      </button>
      {progress && 
      <p className='video_form--progress'>
        {progress}% Загружено  
      </p>}

    </form>
    </div>
  )
}