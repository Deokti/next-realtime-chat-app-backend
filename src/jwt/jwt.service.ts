import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import jsonWebToken, { verify } from "jsonwebtoken";
import { IJwt } from "../interfaces/auth.interface";
import { HTTPError } from "../errors/http.error";
import { ILoggerService } from "../logger/logger.service.interface";
import { IConfigService } from "../config/config.service.interface";
import { IJwtService } from "./jwt.service.interface";

@injectable()
export class JwtService implements IJwtService {
  private jwt: typeof jsonWebToken;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: IConfigService,
  ) {
    this.jwt = jsonWebToken;
  }

  public sign(_id: string | undefined, email: string, password: string): IJwt {
    const accessToken = this.createAccessToken(email, password);
    return {
      _id,
      accessToken,
    };
  }

  public verify(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next();

    try {
      const verified = verify(token, this.config.get("JWT_SECRET_KEY"));
      (req as any).user = verified;
      next();
    } catch (err: any) {
      return next(new HTTPError(400, err.message, "JWT"));
    }
  }

  private createAccessToken(email: string, password: string): string {
    return this.jwt.sign(
      { email, password },
      this.config.get("JWT_SECRET_KEY"),
      {
        expiresIn: "24h",
      },
    );
  }
}
