import { createSlice } from '@reduxjs/toolkit'
import { Auth, User } from '../../global.interface'
import { current } from 'immer'


const initialUserJSON = localStorage.getItem('user')


// const loggedOutUser: User = {
//     email: '',
//     username: '',
//   }

// const initialUser = initialUserJSON  ? JSON.parse(initialUserJSON) : loggedOutUser
// const initialUser: User = {
//   username: initialUserParsed.username,
//   email: initialUserParsed.email,
// }

const initialState: Auth = {
  isLogged: initialUserJSON !== null,
  // user: {...loggedOutUser},
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
      state = {
        ...state,
        ...action.payload,
      }
      return state
    },
  },
})

export const { login, logout, changePair } = authSlice.actions

export default authSlice.reducer