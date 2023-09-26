import {instance as axios} from './auth.service'
import { Creator, UserPatch } from "../global.interface";
import { API_URL, AUTH_URL, CREATOR_URL } from "../settings";
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
    }
  })
}

export async function getCreator(creatorName: string) {
  return await axios.get(CREATOR_URL + 'get/' + creatorName, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function getMeCreator() {
  return await axios.get(CREATOR_URL + 'getMe/', {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function regCreator(creator: Creator) {
  return await axios.post(API_URL + '/creator/reg/',{'creator': creator}, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}