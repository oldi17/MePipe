import { createSlice } from '@reduxjs/toolkit'
import Layout from './Layout.interface'

console.log(document.URL)

const initialState: Layout = {
  isUserMenuVisible: false,
  isCreatorMode: false,
  currentPath: window.location.pathname
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
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload.url
      return state
    },
    setCreatorMode: (state, action) => {
      state.isCreatorMode = action.payload.value
      return state
    },
  },
})

export const { 
  toggleUserMenu, 
  setOnUserMenu,
  setOffUserMenu,
  setCurrentPath,
  setCreatorMode,
} = layoutSlice.actions

export default layoutSlice.reducer