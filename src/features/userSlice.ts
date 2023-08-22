import { createSlice } from '@reduxjs/toolkit'
import User from '../types/User'

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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state = {
        name: 'oldi',
        photo: 'photo.png',
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

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer