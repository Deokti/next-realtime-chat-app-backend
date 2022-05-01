import { IUser } from "../models/user.model";
import { СonditionFind } from "./users.controller.interface";

export interface IUsersRepository {
  create(user: IUser): Promise<IUser>;
  get(_id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  find(condition: СonditionFind): Promise<IUser | null>;
}
