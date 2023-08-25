import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import './SideBar.css'

function SideBar() {
  const sideBar = useSelector(
    (state: RootState) => state.layout.sideBar
  )
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const elements = sideBar.elements.map(e => (
    <div 
      className={"sidebar-element" + (isCreatorMode ? ' creator-mode' : '')}
    >
      <Link to={e.url} className={sideBar.current === e.url ? 'creator-mode' : ''}>
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