import { ILogin, IRegister } from "./../models/auth.model";
import { IUser } from "../models/user.model";

export type –°onditionFind = { [field: string]: string };

export interface IUsersController {
  create(data: IRegister): Promise<IUser>;
  verification(data: ILogin): Promise<IUser | null>;
  find(condition: –°onditionFind): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
