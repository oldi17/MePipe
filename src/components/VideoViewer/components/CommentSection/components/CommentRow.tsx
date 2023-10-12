import { Comment } from '../../../../../global.interface'
import { convertVideoCreatedAt } from '../../../../../lib/convertToHumanReadable';
import './CommentRow.css'

export default function CommentRow(props: {
  comment: Comment;
}) {
  return (
    <div>
      <p>
        {props.comment.user_username}
      </p>
      <p>
        {props.comment.modified}
      </p>
      <p>
        {props.comment.content}
      </p>
      <p>
        {convertVideoCreatedAt(props.comment.createdAt)}
      </p>
      
    </div>
  )
}