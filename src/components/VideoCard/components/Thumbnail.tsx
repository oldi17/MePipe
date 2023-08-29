import './Thumbnail.css'

function Thumbnail( props:{
  imgSrc: string;
  time: string;
  classNames: string[];
}) {
  return (
    <div className={["thumbnail", ...props.classNames].join(' ')}>
      <img className="thumbnail--img" src={props.imgSrc}/>
      <p className="thumbnail--time">
        {props.time}
      </p>
    </div>
  )
}

export default Thumbnail