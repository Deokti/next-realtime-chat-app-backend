import { IUser } from "../models/user.model";
import { –°onditionFind } from "./users.controller.interface";

export interface IUsersRepository {
  create(user: IUser): Promise<IUser>;
  get(_id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  find(condition: –°onditionFind): Promise<IUser | null>;
}
