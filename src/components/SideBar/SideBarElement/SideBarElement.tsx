import { Link } from "react-router-dom";

export default function SideBarElement(props:{
  isCreatorMode: boolean;
  isCurrent: boolean;
  url: string;
  img: string;
  title: string;
}) {
  return (
    <div 
      className={"sidebar-element" + (props.isCreatorMode ? ' creator-mode' : '')}
    >
      <Link to={props.url} className={props.isCurrent ? 'current' : ''}>
        <img 
          src={props.img + (props.isCurrent ? '-c' : '') + '.svg'}
          className="sidebar-element--img"
        />
        <p className="sidebar-element--title">
          {props.title}
        </p>
      </Link>
    </div>
  )
}