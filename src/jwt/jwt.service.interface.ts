import { Request, Response, NextFunction } from "express";
import { IJwt } from "../interfaces/auth.interface";

export interface IJwtService {
  sign(_id: string | undefined, email: string, password: string): IJwt;
  verify(req: Request, res: Response, next: NextFunction): void;
}
