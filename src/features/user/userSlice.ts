import { createSlice } from '@reduxjs/toolkit'
import User from '../../global.interface'

const initialState: User = {
    name: null,
    photo: null,
    token: null,
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state = {
        name: 'oldi',
        photo: '/static/photo.png',
        token: 'null',
      }
      return state
    },
    logout: (state) => {
      state = {
        name: null,
        photo: null,
        token: null,
      }
      return state
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer