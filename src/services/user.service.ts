import {instance as axios} from './auth.service'
import { Creator, CreatorMod, CreatorReg, UserPatch, VideoUpload } from "../global.interface";
import { API_URL, AUTH_URL, COMMENT_URL, CREATOR_URL, VIDEO_URL } from "../settings";
import { destructObject } from "./auth.service";

export async function modifyUser(user: UserPatch = {}) {
  const formData = new FormData()
  destructObject(user, 
    (key, value) => 
    formData.append(key, value)
  )
  return await axios.patch(AUTH_URL + 'modify/', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function getCreatorByName(creatorName: string) {
  return await axios.get(CREATOR_URL + 'get/' + creatorName)
}

export async function getCreatorById(creatorId: number) {
  return await axios.get(CREATOR_URL + 'get/id/' + creatorId)
}

export async function getMeCreator() {
  return await axios.get(CREATOR_URL + 'getMe/')
}

export async function regCreator(creator: CreatorReg, channel_background: File|undefined) {
  const formData = new FormData()
  destructObject(creator, 
    (key, value) => 
    formData.append(key, value)
  )

  if (channel_background)
    formData.append('channel_background', channel_background)

  return await axios.post(CREATOR_URL + 'reg/', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function modifyCreator(creator: CreatorMod) {
  const formData = new FormData()
  destructObject(creator, 
    (key, value) => 
    formData.append(key, value)
  )
  return await axios.patch(CREATOR_URL + 'modify/', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function getCreatorVideo(creatorName: string) {
  return await axios.get(VIDEO_URL + 'creator/' + creatorName)
}

export function createVideo(video: VideoUpload, onUploadProg: Function, ) {
  const formData = new FormData()
  destructObject(video, 
    (key, value) => 
    formData.append(key, value)
  )

  const controller = new AbortController()

  return {
    controller, 
    promise: axios.post(VIDEO_URL + 'add/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
      onUploadProgress: (e) => {
        if (!e.total) {
          onUploadProg(0)
          return
        }
        const percent = e.loaded / e.total * 100
        onUploadProg(percent)
      }
  })}
}

export async function removeVideo(videoUrl: string) {
  return await axios.delete(VIDEO_URL + 'del/' + videoUrl)
}

export async function getVideoComments(videoUrl: string) {
  return await axios.get(COMMENT_URL + 'count/' + videoUrl)
}