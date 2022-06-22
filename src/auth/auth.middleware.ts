import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

import { inject } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IJwtService } from "../jwt/jwt.service.interface";

export class AuthMiddleware {
  constructor(@inject(INVERSIFY_TYPES.JwtSerice) private jwt: IJwtService) {}

  public execute(req: Request, res: Response, next: NextFunction): void {
    this.jwt.verify(req, res, next);
  }
}
