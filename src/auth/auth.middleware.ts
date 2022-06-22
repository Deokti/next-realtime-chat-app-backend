import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

import { inject } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { JwtSerice } from "../jwt/jwt.service";

export class AuthMiddleware {
  constructor(@inject(INVERSIFY_TYPES.JwtSerice) private jwt: JwtSerice) {}

  public execute(req: Request, res: Response, next: NextFunction): void {
    this.jwt.verify(req, res, next);
  }
}
