import { Creator } from '../../../../global.interface'
import './CreatorAbout.css'

export default function CreatorAbout(props:{
  creator: Creator;
}) {
  return (
    <>
    <p>Описание:</p>
    <p>{props.creator.description}</p>
    <p>Контакты:</p>
    <p>{props.creator.contacts}</p>
    </>
  )
}