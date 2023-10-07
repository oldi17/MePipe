import { createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../global.interface'

const initialUserJSON = localStorage.getItem('user')

const initialState: Auth = {
  isLogged: initialUserJSON !== null,
  user: initialUserJSON ? JSON.parse(initialUserJSON) : {
    email: '',
    username: '',
  },
  access: localStorage.getItem('access') || '',
  refresh: localStorage.getItem('refresh') || '',
}

const loggedOutState: Auth = {
  isLogged: false,
  user: {
    email: '',
    username: '',
  },
  access: '',
  refresh: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true
      state.user = action.payload.user
      state.access = action.payload.access
      state.refresh = action.payload.refresh
      return state
    },
    logout: (state) => {
      state = {
        ...state,
        ...loggedOutState,
      }
      return state
    },
    changePair: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
      return state
    },
  },
})

export const { login, logout, changePair } = authSlice.actions

export default authSlice.reducer