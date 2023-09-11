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
	contacts?: string;
	description?: string;
	user_id?: number;
	channel_background?: File;
}

export interface Auth {
  isLogged: boolean;
  user: User;
  access: string;
  refresh: string;
}