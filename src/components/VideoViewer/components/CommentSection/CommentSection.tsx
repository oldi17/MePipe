import { useEffect, useState } from "react"
import './CommentSection.css'
import { Comment, Video } from "../../../../global.interface";
import { createComment, getAllComments, getVideoCommentsCount } from "../../../../services/user.service";
import CommentRow from "./components/CommentRow";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

function CommentSection(props: {
  classNames: string[];
  video: Video;
}) {
  const [newComment, setNewComment] = useState('')
  const isLogged = useSelector(
    (state: RootState) => state.auth.isLogged
  )
  const [commentsCount, setCommentsCount] = useState(0)
  
  const [currPage, setCurrPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoadable, setIsLoadable] = useState(true)

  const commentRows = comments.map(c => 
    <CommentRow comment={c} key={c.id} />)

  useEffect(() => {
    getNextPage()
    getCommentsCount()
  }, [])

  function getNextPage() {
    if (currPage > maxPage) {
      return
    }
    const localCurrPage = currPage
    setCurrPage(maxPage + 1)
    getAllComments(props.video.url, currPage)
    .then(res => {
      setComments(prev => ([
        ...prev,
        ...res.data.comments.filter((c: Comment) => !prev.find(cc => cc.id === c.id)),
      ]))
      setCurrPage(localCurrPage + 1)
      const max = +(((res.data.lastlink as string).match(/\d+$/) || [1] )[0])
      setMaxPage(max)
      if (localCurrPage == max) {
        setIsLoadable(false)
      }
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