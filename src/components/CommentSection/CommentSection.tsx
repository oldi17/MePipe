import { useEffect, useState } from "react"

function CommentSection(props: {url:string}) {
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState(() => {
    props
    return []
  })

  useEffect(() => {
    setComments([])
    // finish it
  }, [])

  function sendComment() {
    if (newComment == '')
      return
    // finish it
  }

  return (
    <section>
      <p>
        Комментарии: {comments.length}
      </p>
      <div>
        <input 
          type="text"
          placeholder="Введите свой комментарий"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          onClick={sendComment}
        >
          Отправить комментарий
        </button>
      </div>
      {comments}
    </section>
  )
}

export default CommentSection