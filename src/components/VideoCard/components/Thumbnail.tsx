import './Thumbnail.css'

function Thumbnail( props:{
  imgSrc: string;
  time: string;
}) {
  return (
    <div className="vc--thumbnail">
      <img className="vc--thumbnail--img" src={props.imgSrc}/>
      <p className="vc--thumbnail--time">
        {props.time}
      </p>
    </div>
  )
}

export default Thumbnail