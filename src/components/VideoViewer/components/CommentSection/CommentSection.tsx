import { useEffect, useState } from "react"
import './CommentSection.css'
import { Comment, Video } from "../../../../global.interface";
import { createComment, getAllComments, getVideoCommentsCount, modifyComment } from "../../../../services/user.service";
import CommentRow from "./components/CommentRow";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import usePaginate from "../../../../hooks/usePaginate";

function CommentSection(props: {
  classNames: string[];
  video: Video;
}) {
  const [newComment, setNewComment] = useState('')
  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )
  const user = useSelector((state: RootState) => state.auth.user)

  const [commentsCount, setCommentsCount] = useState(0)
  
  const [comments, setComments] = useState<Comment[]>([])

  const [getNextPage, isLoadable] = usePaginate<Comment>(
    setComments,
    (page?: number) => getAllComments(props.video.url, page),
    (c1: Comment, c2: Comment) => c1.id === c2.id,
    'comments'
  )

  const commentRows = comments.map(c => 
    <CommentRow 
      comment={c} 
      key={c.id} 
      changer={(newContent: string) => changeComment(c.id, newContent)}
      username={user.username}/>)

  useEffect(() => {
    getCommentsCount()
  }, [])

  function changeComment(id: number, content: string) {
    modifyComment(id, content)
    .then(res => {
      setComments(prev => {
        const newComments = [...prev]
        const ind = newComments.findIndex(c => c.id === res.data.comment.id)
        newComments[ind] = res.data.comment
        return newComments
      })
    })
  }

  function getCommentsCount() {
    getVideoCommentsCount(props.video.url)
    .then(res => setCommentsCount(+res.data))
  }

  function sendComment() {
    if (newComment == '') {
      return
    }
    const localNewComment = newComment
    setNewComment('')
    createComment(props.video.url, localNewComment)
    .then(res => {
      setComments(prev => ([
        res.data.comment,
        ...prev,
      ]))
      getCommentsCount()
    })
  }

  return (
    <section
      className={[...props.classNames].join(' ')}
    >
      <p>
        Комментарии: {commentsCount}
      </p>
      {isLogged &&
      <div>
        <textarea 
          placeholder="Введите свой комментарий"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          type="button"
          onClick={sendComment}
        >
          Отправить комментарий
        </button>
      </div>}
      {commentRows}
      {isLoadable && 
      <button 
        type="button"
        onClick={() => getNextPage()}
      >+</button>}
    </section>
  )
}

export default CommentSection