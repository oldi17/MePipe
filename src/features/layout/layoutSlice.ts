import { createSlice } from '@reduxjs/toolkit'
import Layout from './Layout.interface'
import { creatorSideBar, viewerSideBar } from './sideBars'


const initialState: Layout = {
  isUserMenuVisible: false,
  inCreatorMode: false,
  sideBar: viewerSideBar,
}

export const layoutSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUserMenu: (state) => {
      state.isUserMenuVisible = !state.isUserMenuVisible
      return state
    },
    setOnUserMenu: (state) => {
      state.isUserMenuVisible = true
      return state
    },
    setOffUserMenu: (state) => {
      state.isUserMenuVisible = false
      return state
    },
    setCurrentSideBarElement: (state, action) => {
      const newCurrent = state.sideBar.elements
        .find(e => e.id === action.payload.id)
      state.sideBar.current = newCurrent ? newCurrent.id : state.sideBar.current
      return state
    },
    switchToViewerMode: (state) => {
      state.sideBar = viewerSideBar
      state.inCreatorMode = false
      return state
    },
    switchToCreatorMode: (state) => {
      state.sideBar = creatorSideBar
      state.inCreatorMode = true
      return state
    },
  },
})

export const { 
  toggleUserMenu, 
  setOnUserMenu,
  setOffUserMenu,
  setCurrentSideBarElement,
  switchToViewerMode,
  switchToCreatorMode,
} = layoutSlice.actions

export default layoutSlice.reducer