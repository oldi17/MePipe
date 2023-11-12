import { useEffect, useState } from "react"
import './CommentSection.css'
import { Comment, Video } from "../../../../global.interface";
import { createComment, dislikeComment, getAllComments, getVideoCommentsCount, likeComment, modifyComment, unlikeComment } from "../../../../services/user.service";
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
  const [isVisibleNewComment, setIsVisibleNewComment] = useState(false)
  
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
      handleChange={(newContent: string) => changeComment(c.id, newContent)}
      handleLike={(like: 'like' | 'dislike') => handleLike(like, c.id)}
      isOwn={user.username === c.user_username}
      isLogged={isLogged}  
    />)

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
    handleFocus(false)
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

  function adjustTextArea(el: HTMLTextAreaElement) {
    el.style.height = "1px"
    el.style.height = (el.scrollHeight) + "px"
  }

  function handleFocus(isFocused: boolean) {
    setIsVisibleNewComment(isFocused)
  }

  function handleLike(like: 'like' | 'dislike', commentId: number) {
    if (!isLogged) {
      return
    }
    const comment = comments.find(e => e.id === commentId)
    if (!comment) {
      return
    }
    const isliked = comment.isliked
    let promise
    if (isliked === 1 && like === 'like' || isliked === -1 && like === 'dislike') {
      promise = unlikeComment(comment.id)
    } else if(like === 'like') {
      promise = likeComment(comment.id)
    } else {
      promise = dislikeComment(comment.id)
    }
    promise.then(res => {
      setComments(prev => {
        const newComments = [...prev]
        newComments[newComments.findIndex(e => e.id === commentId)] = res.data.comment
        return newComments
      })
    })
  }

  return (
    <section
      className={["cs", ...props.classNames].join(' ')}
    >
      <p className="cs--comments_count">
        Комментарии: {commentsCount}
      </p>
      {isLogged &&
      <div className="cs--new">
        <textarea 
          className="cs--new--text_input"
          placeholder="Введите комментарий"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyUp={e => adjustTextArea(e.currentTarget)}
          onFocus={() => handleFocus(true)}
          rows={1}
          maxLength={255}
        />
        {isVisibleNewComment &&
        <div className="cs--new--buttons">
          <button 
            className="cs--new--btn_cancel btn"
            type="button"
            onClick={() => {
              setNewComment('')
              const el = document.querySelector('.cs--new--text_input') as HTMLTextAreaElement
              el.style.height = "25px"
              handleFocus(false)
            }}
          >
            Отмена
          </button>
          <button 
            className="cs--new--btn_send btn"
            type="button"
            onClick={sendComment}
            disabled={newComment.length < 1}
          >
            Отправить комментарий
          </button>
        </div>}
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