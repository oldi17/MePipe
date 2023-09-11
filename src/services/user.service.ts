import axios from "axios";
import { Creator, UserPatch } from "../global.interface";
import { API_URL, AUTH_URL } from "../settings";
import authHeader from "./auth-header";
import { destructObject } from "./auth.service";

export async function modifyUser(user: UserPatch = {}) {
  const formData = new FormData()
  destructObject(user, 
    (key, value) => 
    formData.append(key, value)
  )
  return await axios.patch(AUTH_URL + 'modify/',{'user': user}, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader()
    }
  })
}

export async function regCreator(creator: Creator) {
  return await axios.post(API_URL + '/creator/reg/',{'creator': creator}, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader()
    }
  })
}