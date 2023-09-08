import { createSlice } from '@reduxjs/toolkit'
import Layout from './Layout.interface'

console.log(document.URL)

const initialState: Layout = {
  isUserMenu: false,
  isLoginForm: false,
  isCreatorMode: false,
  currentPath: window.location.pathname
}

export const layoutSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleUserMenu: (state) => {
      state.isUserMenu = !state.isUserMenu
      return state
    },
    setUserMenu: (state, action) => {
      state.isUserMenu = action.payload.isUserMenu
      return state
    },
    setLoginForm: (state, action) => {
      state.isLoginForm = action.payload.isLoginForm
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
  setUserMenu,
  setLoginForm,
  setCurrentPath,
  setCreatorMode,
} = layoutSlice.actions

export default layoutSlice.reducer