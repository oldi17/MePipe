import { createSlice } from '@reduxjs/toolkit'
import Layout from './Layout.interface'


const initialState: Layout = {
  isUserMenu: false,
  signForm: {
    visible: false,
    view: 'reg',
  },
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
      state.isUserMenu = action.payload.value
      return state
    },
    setSignFormVisible: (state, action) => {
      state.signForm.visible = action.payload.value
      return state
    },
    setSignFormView: (state, action) => {
      state.signForm.view = action.payload.value
      return state
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload.value
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
  setSignFormVisible,
  setSignFormView,
  setCurrentPath,
  setCreatorMode,
} = layoutSlice.actions

export default layoutSlice.reducer