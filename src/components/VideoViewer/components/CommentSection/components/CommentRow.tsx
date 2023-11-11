import { useEffect, useState } from 'react';
import { Comment } from '../../../../../global.interface'
import { convertVideoCreatedAt } from '../../../../../lib/convertToHumanReadable';
import './CommentRow.css'
import { MEDIA_PFP_URL } from '../../../../../settings';
import ReadMore from '../../../../ReadMore/ReadMore';

export default function CommentRow(props: {
  comment: Comment;
  changer: Function;
  isOwn: boolean;
  isLogged: boolean;
}) {
  const [newContent, setNewContent] = useState<string>()

  function handleChange() {
      setNewContent(props.comment.content)
      setTimeout(() => {
        const el = document.querySelector('.comment_row--changer--text_input')
        adjustTextArea(el as HTMLTextAreaElement)
      })
  }

  function handleSave() {
    if(newContent != props.comment.content) {
      props.changer(newContent?.replace('\r', '\n'))
      setNewContent(undefined)
    } else {
      setNewContent(undefined)
    } 
  }

  function adjustTextArea(el: HTMLTextAreaElement) {
    el.style.height = "1px"
    el.style.height = (el.scrollHeight) + "px"
  }

  return (
    <div className='comment_row'>
      <div className='comment_row--pfp_cont'>
      <img 
        className='comment_row--pfp' 
        src={MEDIA_PFP_URL + props.comment.user_username + '.png'}
      />
      </div>
      <div className='comment_row--texts'>

        <div className='comment_row--header'>
            <p className='comment_row--header--username'>
              {props.comment.user_username}
            </p>
            <p className='comment_row--header--created_at'>
              {convertVideoCreatedAt(props.comment.createdAt)}
            </p>
            <p className='comment_row--header--changed'>
              {props.comment.modified && '(изменено)'}
            </p>
        </div>

        {newContent === undefined &&
        <>
        <ReadMore
          className='comment_row--content'
          linesNum={5}
          symbolsNum={5000}
        >
          {props.comment.content}
        </ReadMore>
        <div className='comment_row--buttons'>
          {props.isLogged && <p className='btn'>like</p>}
          {props.isOwn && 
          <button
            type='button'
            onClick={handleChange}
            className='comment_row--change_btn btn'
          >
            Изменить
          </button>}
        </div>
        </>}
        
        {newContent !== undefined &&
        <div className='comment_row--changer'>
          <textarea 
            className="comment_row--changer--text_input"
            name="new_content"
            id="new_content"
            value={newContent || ''}
            onChange={e => setNewContent(e.target.value)}
            onKeyUp={e => adjustTextArea(e.currentTarget)}
            minLength={1}
            maxLength={255}
            rows={1}
          />
          <button
            type='button'
            onClick={handleSave}
            className='comment_row--save_btn btn'
          >
            Сохранить
          </button>
        </div>}
        
      </div>
    </div>
  )
}