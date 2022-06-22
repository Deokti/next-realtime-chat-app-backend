import { NextFunction, Response, Request } from "express";
import { RouterController } from "../router/router.controller";

export interface IAuthController extends RouterController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
