import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Link } from "react-router-dom"
import { setCurrentSideBarElement } from "../../features/layout/layoutSlice"
import './SideBar.css'

function SideBar() {
  const sideBar = useSelector((state: RootState) => state.layout.sideBar)
  const dispatch = useDispatch()

  const elements = sideBar.elements.map(e => (
    <div 
      className="sidebar-element"
      onClick={() => dispatch(setCurrentSideBarElement({url: e.url}))}
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