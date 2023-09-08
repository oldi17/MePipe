import axios from "axios"
import { AUTH_URL } from '../settings'
import { User, UserLogin } from "../global.interface";
import { useSelector } from "react-redux";
import { changePair, login, logout } from "../features/auth/authSlice";
import store, { RootState } from "../store";
import authHeader from "./auth-header";
import { Dispatch } from "@reduxjs/toolkit";



class AuthService {
  dispatch:Dispatch
  constructor() {
    this.dispatch = store.dispatch
  }
  async login(user: UserLogin) {
    const response = await axios.post(AUTH_URL + "login/", { 'user': user })

    if (response.status === 200) {
      destructObjectToLocalStorage(response.data)
      this.dispatch(login(response.data))
    }

    return response
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    this.dispatch(logout())
  }

  async register(user: User) {
    const formData = new FormData()
    destructObject(user, 
      (key, value) => 
      formData.append(key, value)
    )

    return await axios.post(
      AUTH_URL + "reg/", 
      formData, 
      {
        headers: {"Content-Type": "multipart/form-data"}
      }
    )
  }

  async obtainPair() {
    const refreshToken = useSelector(
      (state: RootState) => state.auth.refresh
    )

    const response = await axios.post(
      AUTH_URL + "token/refresh/", 
      { refreshToken }, 
      { headers: authHeader()}
    )

    if (response.status === 200) {
      destructObjectToLocalStorage(response.data)
      
      this.dispatch(changePair({...response.data}))
    }

  }
}

function destructObject(obj: Object, callback: (ker: string, value: any) => void) {
  Object.entries(obj).forEach(([key, value]) => {
    callback(key, value)
  })
}

function destructObjectToLocalStorage(obj: Object) {
  destructObject(obj, 
    (key, value) => 
      localStorage.setItem(key, JSON.stringify(value))
  )
}

export default new AuthService()