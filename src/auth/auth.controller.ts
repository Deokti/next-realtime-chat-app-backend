/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { RouterController } from "../router/router.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";
import { IUsersController } from "../users/users.controller.interface";

@injectable()
export class AuthController extends RouterController implements IAuthController {
  constructor(
    @inject(INVERSIFY_TYPES.Logger) logger: LoggerService,
    @inject(INVERSIFY_TYPES.UsersController) private usersController: IUsersController,
  ) {
    super(logger);

    this.bindRoutes([
      { path: "/login", method: "get", func: this.login },
      { path: "/register", method: "post", func: this.register },
    ]);
  }

  async login(req: Request, res: Response): Promise<void> {
    res.send("login");
  }

  async register(req: Request, res: Response): Promise<void> {
    const data = await this.usersController.create(req.body);
    res.send(data);
  }
}
