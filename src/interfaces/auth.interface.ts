export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  online: boolean;
  friends: string[];
  salt: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  username: string;
}
