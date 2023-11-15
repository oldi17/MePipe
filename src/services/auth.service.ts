import axios from "axios"
import { AUTH_URL } from '../settings'
import { UserLogin, UserReg } from "../global.interface";
import { changePair, login, logout } from "../features/auth/authSlice";
import store from "../store";

const dispatch = store.dispatch

export function authLogin(user: UserLogin) {
  return axios.post(AUTH_URL + "login/", { 'user': user })
  .then(res => {
    if (res.status === 200) {
      destructObjectToLocalStorage(res.data)
      dispatch(login(res.data))
      return res
    }
    return Promise.reject(res)
  })
  .catch( err => {
    return Promise.reject(err)
  })
}

export function authLogout() {
  localStorage.removeItem("user")
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  dispatch(logout())
}

export function authRegister(user: UserReg) {
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

export const instance = axios.create()

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('access') || '0')
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = 1
        return refresh(originalConfig)
      }
    }

    return Promise.reject(err)
  }
)

async function refresh(originalConfig: any) {
  const refreshToken = localStorage.getItem('refresh')
  if (!refreshToken) {
    authLogout()
    return Promise.reject()
  }
  try {
    const rs = await axios.post(AUTH_URL + "token/refresh/", {
      refresh: JSON.parse(refreshToken),
    })
    destructObjectToLocalStorage(rs.data)
    dispatch(changePair(rs.data))
    return instance(originalConfig)
  } catch (_error) {
    if (originalConfig._retry < 5) {
      wait(2000)
      return refresh(originalConfig)
    } else {
      authLogout()
      return Promise.reject(_error)
    }
  }
}

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}