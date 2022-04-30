import { IRegister } from "./../models/auth.model";
import { IUser } from "../models/user.model";

export type Find = { [field: string]: string };

export interface IUsersController {
  create(data: IRegister): Promise<IUser>;
  findById(_id: string): Promise<IUser>;
  getAll(): Promise<IUser[]>;
}
