import { IRegister, IUser, ILogin } from "../interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";

export type СonditionFind = { [field: string]: string };

export interface IUsersController {
  create(data: IRegister): Promise<IUser>;
  verification(data: ILogin): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
  findById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
