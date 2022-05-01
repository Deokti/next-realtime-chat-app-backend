import { ILogin, IRegister } from "./../models/auth.model";
import { IUser } from "../models/user.model";

export type СonditionFind = { [field: string]: string };

export interface IUsersController {
  create(data: IRegister): Promise<IUser>;
  verification(data: ILogin): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
