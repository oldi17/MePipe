export interface UserBase {
	email: string;
}

export interface User extends UserBase {
	username: string;
}

export interface UserLogin extends UserBase {
	password: string;
}

export interface UserReg extends User {
	password: string;
	logo?: File;
}

export interface UserPatch {
	username?: string;
	email?: string;
	password?: string;
	logo?: File;
}

export interface Creator {
	name: string;
	contacts: string;
	description: string;
	subscribers: number;
}

export interface CreatorAuthed extends Creator {
	issubscribed: boolean;
}

export interface CreatorMe extends Creator {
	views: number;
}

export interface CreatorPatch {
	name?: string;
	contacts?: string;
	description?: string;
	channel_background?: File;
}

export interface Auth {
  isLogged: boolean;
  user: User;
  access: string;
  refresh: string;
}

export interface Video {
  creator_name: string;
  title: string;
  description: string;
  url: string;
  duration: number;
  views: number;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export interface VideoWithCommentsCount extends Video {
	commentsCount?: number;
}

export interface Comment {
	id: number;
  user_username: string;
  video_url: string;
  owner: string;
  content: string;
  createdAt: number;
  modified: boolean;
  likes: number;
  dislikes: number;
  isliked: number;
}