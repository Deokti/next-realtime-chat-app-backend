import { IRegister, IUser, ILogin } from "../interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
import { RouterController } from "../router/router.controller";

export type СonditionFind = { [field: string]: string };

export interface IUsersController extends RouterController {
  create(data: IRegister): Promise<IUser>;
  verification(data: ILogin): Promise<IUser | null>;
  find(condition: СonditionFind): Promise<IUser | null>;
  get(req: Request, res: Response, next: NextFunction): Promise<void>;
}
