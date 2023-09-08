import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './features/layout/layoutSlice'
import authReducer from './features/auth/authSlice'

 const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>