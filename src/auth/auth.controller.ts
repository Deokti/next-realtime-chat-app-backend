import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { RouterController } from "../router/router.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";
import { IUsersController } from "../users/users.controller.interface";
import { HTTPError } from "../errors/http.error";

@injectable()
export class AuthController
  extends RouterController
  implements IAuthController
{
  constructor(
    @inject(INVERSIFY_TYPES.Logger) logger: LoggerService,
    @inject(INVERSIFY_TYPES.UsersController)
    private usersController: IUsersController,
  ) {
    super(logger);

    this.bindRoutes([
      { path: "/login", method: "post", func: this.login },
      { path: "/register", method: "post", func: this.register },
    ]);
  }

  async login(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const account = await this.usersController.verification(body);

    if (!account) {
      return next(
        new HTTPError(
          422,
          "Пользователя с таким Email или паролем не существует",
          "LOGIN",
        ),
      );
    }

    res.status(200).send(account);
  }

  async register(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const account = await this.usersController.find({ email: body.email });

    if (account)
      return next(
        new HTTPError(409, "Такой E-mail уже существует", "REGISTER"),
      );

    const data = await this.usersController.create(body);
    res.status(201).send(data);
  }
}
