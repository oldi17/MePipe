import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import './SideBar.css'
import { creatorSideBar, viewerSideBar } from "./sideBars"
import SideBarElement from "./SideBarElement/SideBarElement"

function SideBar() {
  const isCreatorMode = useSelector(
    (state: RootState) => state.layout.isCreatorMode
  )

  const currentSideBarElement = useSelector(
    (state: RootState) => state.layout.currentPath
  )

  const sideBar = isCreatorMode ? creatorSideBar : viewerSideBar

  const elements = sideBar.elements.map(e => (
    <SideBarElement 
      key={e.url}
      isCreatorMode={isCreatorMode}
      isCurrent={currentSideBarElement === e.url}
      url={e.url}
      img={e.img}
      title={e.title}
    />
  ))
  return (
    <aside className="sidebar">
      {elements}
    </aside>
  )
}

export default SideBar