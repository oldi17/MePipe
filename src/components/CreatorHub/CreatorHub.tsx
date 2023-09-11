import { modifyUser } from '../../services/user.service'
import './CreatorHub.css'

export default function CreatorHub() {
  return (
    <div>
      <button type='button' onClick={() => {
        modifyUser()
          .then((res) => {console.log(res)})
          .catch((err) => {console.log(err)})
      }}
      >
        click
      </button>
    </div>
  )
}