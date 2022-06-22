import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import jsonWebToken, { verify } from "jsonwebtoken";
import { ConfigService } from "../config/config.service";
import { IJwt } from "../interfaces/auth.interface";
import { HTTPError } from "../errors/http.error";

@injectable()
export class JwtSerice {
  jwt: typeof jsonWebToken;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: ConfigService,
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
