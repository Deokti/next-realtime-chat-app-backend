import { ILogin, IRegister, IUser } from "../interfaces/auth.interface";
import { СonditionFind } from "./users.controller.interface";

export interface IUsersService {
  create({ email, password, username }: IRegister): any;
  verification({ email, password }: ILogin): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
}
