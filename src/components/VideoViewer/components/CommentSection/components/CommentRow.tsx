import { useEffect, useState } from 'react';
import { Comment } from '../../../../../global.interface'
import { convertVideoCreatedAt } from '../../../../../lib/convertToHumanReadable';
import './CommentRow.css'

export default function CommentRow(props: {
  comment: Comment;
  changer: Function;
  username: string;
}) {
  const [newContent, setNewContent] = useState<string>()

  useEffect(() => {console.log(props.username, props.comment.user_username)}, [])

  function onClick() {
    if (newContent === undefined) {
      setNewContent(props.comment.content)
    } else {
      props.changer(newContent)
      setNewContent(undefined)
    }
    
  }
  return (
    <div>
      <p>
        {props.comment.user_username}
      </p>
      <p>
        {props.comment.modified && '(изм.)'}
      </p>
      <p>
        {props.comment.content}
      </p>
      {newContent !== undefined &&
      <textarea 
        className=""
        name="new_content"
        id="new_content"
        value={newContent || ''}
        onChange={e => setNewContent(e.target.value)}
        minLength={1}
      />}
      {props.comment.user_username === props.username && 
      <button
        type='button'
        onClick={onClick}
      >
        {newContent === undefined ? 'Изменить' : 'Сохранить'}</button>}
      <p>
        {convertVideoCreatedAt(props.comment.createdAt)}
      </p>
      
    </div>
  )
}