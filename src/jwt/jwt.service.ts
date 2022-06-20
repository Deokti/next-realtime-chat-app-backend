import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import jsonWebToken from "jsonwebtoken";
import { ConfigService } from "../config/config.service";
import { IJwt } from "../interfaces/auth.interface";

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
