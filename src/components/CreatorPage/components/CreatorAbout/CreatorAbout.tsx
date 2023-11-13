import { Creator } from '../../../../global.interface'
import './CreatorAbout.css'

export default function CreatorAbout(props:{
  creator: Creator;
}) {
  return (
    <div className='about'>
      <h3>Описание</h3>
      <p>{props.creator.description}</p>
      <h3>Контакты</h3>
      <p>{props.creator.contacts}</p>
    </div>
  )
}