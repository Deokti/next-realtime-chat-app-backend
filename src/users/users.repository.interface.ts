import { IUser } from "../interfaces/auth.interface";
import { СonditionFind } from "./users.controller.interface";

export interface IUsersRepository {
  create(user: IUser): Promise<IUser>;
  get(_id: string): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
}
