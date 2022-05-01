import { IRegister, IUser, ILogin } from "../interfaces/auth.interface";

export type СonditionFind = { [field: string]: string };

export interface IUsersController {
  create(data: IRegister): Promise<IUser>;
  verification(data: ILogin): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
