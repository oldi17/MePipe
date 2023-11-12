import {instance as axios} from './auth.service'
import { CreatorMod, CreatorReg, UserPatch, VideoMod, VideoUpload } from "../global.interface";
import { AUTH_URL, COMMENT_URL, CREATOR_URL, VIDEO_URL } from "../settings";
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

export async function regCreator(creator: CreatorReg, channel_background: File|undefined, channel_pfp: File|undefined) {
  const formData = new FormData()
  destructObject(creator, 
    (key, value) => 
    formData.append(key, value)
  )

  if (channel_background) {
    formData.append('channel_background', channel_background)
  }
  if (channel_pfp) {
    formData.append('channel_pfp', channel_pfp)
  }

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

export async function getSearchVideo(query: string, page: number = 1) {
  return await axios.post(VIDEO_URL + 'search/' + '?page=' + page, {query})
}

export async function getQuery(url: string) {
  return await axios.get(url)
}

export async function subCreator(creatorName: string) {
  return await axios.post(CREATOR_URL + 'sub/' + creatorName)
}

export async function unsubCreator(creatorName: string) {
  return await axios.post(CREATOR_URL + 'unsub/' + creatorName)
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

export async function modifyVideo(video: VideoMod, videoUrl: string) {
  const formData = new FormData()
  destructObject(video, 
    (key, value) => 
    formData.append(key, value)
  )
  return await axios.patch(VIDEO_URL + 'modify/' + videoUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export async function removeVideo(videoUrl: string) {
  return await axios.delete(VIDEO_URL + 'del/' + videoUrl)
}

export async function getVideo(videoUrl: string) {
  return await axios.get(VIDEO_URL + 'watch/' + videoUrl)
}

export async function likeVideo(videoUrl: string) {
  return await axios.post(VIDEO_URL + 'like/' + videoUrl)
}

export async function unlikeVideo(videoUrl: string) {
  return await axios.post(VIDEO_URL + 'unlike/' + videoUrl)
}

export async function dislikeVideo(videoUrl: string) {
  return await axios.post(VIDEO_URL + 'dislike/' + videoUrl)
}

export async function setHistoryVideoTime(videoUrl: string, time: number) {
  return await axios.post(VIDEO_URL + 'history/t/' + videoUrl, {
    'time': time,
  })
}

export async function getCreatorWithUsername(creatorName: string) {
  return await axios.get(CREATOR_URL + 'username/' + creatorName)
}

export async function getAllRecVideos(creatorName: string, page: number = 1) {
  return await axios.get(VIDEO_URL + 'rec/all/' + creatorName + '?page=' + page)
}

export async function getAllComments(videoUrl: string, page: number = 1) {
  return await axios.get(COMMENT_URL + 'all/' + videoUrl + '?page=' + page)
}

export async function createComment(videoUrl: string, content: string) {
  return await axios.post(COMMENT_URL + 'add/' + videoUrl, {
    'comment': {
      'content': content,
    },
  })
}

export async function modifyComment(commentId: number, content: string) {
  return await axios.patch(COMMENT_URL + 'modify/' + commentId, {
    'comment': {
      'content': content,
    },
  })
}

export async function removeComment(commentId: number) {
  return await axios.delete(COMMENT_URL + 'del/' + commentId)
}

export async function likeComment(commentId: number) {
  return await axios.post(COMMENT_URL + 'like/' + commentId)
}

export async function dislikeComment(commentId: number) {
  return await axios.post(COMMENT_URL + 'dislike/' + commentId)
}

export async function unlikeComment(commentId: number) {
  return await axios.post(COMMENT_URL + 'unlike/' + commentId)
}

export async function getVideoCommentsCount(videoUrl: string) {
  return await axios.get(COMMENT_URL + 'count/' + videoUrl)
}

export async function getAllVideos(page: number = 1) {
  return await axios.get(VIDEO_URL + 'all/' + '?page=' + page)
}

export async function getAllHistoryVideos(page: number = 1) {
  return await axios.get(VIDEO_URL + 'history/all/' + '?page=' + page)
}

export async function getSubscriptionsVideos(page: number = 1) {
  return await axios.get(VIDEO_URL + 'sub/all/' + '?page=' + page)
}