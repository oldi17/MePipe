import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import layoutReducer from './features/layout/layoutSlice'

 const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>