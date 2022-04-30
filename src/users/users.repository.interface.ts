import { IUser } from "../models/user.model";

export interface IUsersRepository {
  create(user: IUser): Promise<IUser>;
  get(_id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
}
