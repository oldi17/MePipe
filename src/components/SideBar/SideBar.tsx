import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import './SideBar.css'

function SideBar() {
  const sideBar = useSelector((state: RootState) => state.layout.sideBar)

  const elements = sideBar.elements.map(e => (
    <div 
      className="sidebar-element"
    >
      <Link to={e.url}>
        <img 
          src={e.img + (sideBar.current === e.url ? '-c' : '') + '.svg'}
          className="sidebar-element--img"
        />
        <p className="sidebar-element--title">
          {e.title}
        </p>
      </Link>
    </div>
  ))
  return (
    <aside className="sidebar">
      {elements}
    </aside>
  )
}

export default SideBar