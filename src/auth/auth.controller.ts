import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { RouterController } from "../router/router.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import userModel from "../models/user.model";

@injectable()
export class AuthController extends RouterController {
  constructor(@inject(INVERSIFY_TYPES.Logger) logger: LoggerService) {
    super(logger);

    this.bindRoutes([
      { path: "/login", method: "get", func: this.login },
      { path: "/register", method: "post", func: this.register },
    ]);
  }

  login(req: Request, res: Response): void {
    res.send("LOGIN");
  }

  async register(req: Request, res: Response): Promise<void> {
    res.send("REGISTER");
  }
}
