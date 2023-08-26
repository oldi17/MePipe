import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import './SideBar.css'
import { creatorSideBar, viewerSideBar } from "./sideBars"

function SideBar() {
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const currentSideBarElement = useSelector(
    (state: RootState) => state.layout.currentPath
  )

  const sideBar = isCreatorMode ? creatorSideBar : viewerSideBar

  const elements = sideBar.elements.map(e => (
    <div 
      className={"sidebar-element" + (isCreatorMode ? ' creator-mode' : '')}
    >
      <Link to={e.url} className={currentSideBarElement === e.url ? 'creator-mode' : ''}>
        <img 
          src={e.img + (currentSideBarElement === e.url ? '-c' : '') + '.svg'}
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