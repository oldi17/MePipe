import axios from "axios"
import { AUTH_URL } from '../settings'
import { UserLogin, UserReg } from "../global.interface";
import { changePair, login, logout } from "../features/auth/authSlice";
import store, { RootState } from "../store";
import authHeader from "./auth-header";
import { Dispatch } from "@reduxjs/toolkit";



class AuthService {
  dispatch:Dispatch
  constructor() {
    this.dispatch = store.dispatch
  }
  login(user: UserLogin) {
    return axios.post(AUTH_URL + "login/", { 'user': user }).then(res => {
      if (res.status === 200) {
        destructObjectToLocalStorage(res.data)
        this.dispatch(login(res.data))
        return res
      }
      return Promise.reject(res)
    })
    .catch( err => {
      return Promise.reject(err)
    })
  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    this.dispatch(logout())
  }

  register(user: UserReg) {
    const formData = new FormData()
    destructObject(user, 
      (key, value) => 
      formData.append(key, value)
    )

    return axios.post(
      AUTH_URL + "reg/", 
      formData, 
      {
        headers: {"Content-Type": "multipart/form-data"}
      }
    )
  }

  async refreshToken() {
    const refreshToken = JSON.parse(localStorage.getItem('refresh') || '')
    
    const res = await axios.post(
      AUTH_URL + "token/refresh/", 
      { 'refresh': refreshToken }, 
      { headers: authHeader()}
    )

    if (res.status === 200) {
      destructObjectToLocalStorage(res.data)
      
      this.dispatch(changePair({...res.data}))
      return res
    }
    this.logout()
  }
}

export function destructObject(obj: Object, callback: (ker: string, value: any) => void) {
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

export function createAxiosResponseInterceptor() {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalConfig = error.config
        console.log(originalConfig)

        if (error.response.status !== 401 || originalConfig.headers._retry) {
            return Promise.reject(error);
        }

        
        const refreshToken = JSON.parse(localStorage.getItem('refresh') || '0')
     
        return axios.post(
            AUTH_URL + "token/refresh/", 
            { 'refresh': refreshToken }, 
            { headers: {...authHeader(),
              _retry: true
            }}
          ).then((res) => {
            destructObjectToLocalStorage(res.data)
            store.dispatch(changePair({...res.data}))
            return axios(error.response.config)
          })
          .catch((error2) => {
              (new AuthService()).logout()
              return Promise.reject(error2)
          })
          .finally(() => createAxiosResponseInterceptor())
    }
);
}