import { Request, Response, NextFunction, Router } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { RouterController } from "../router/router.controller";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { IAuthController } from "./auth.controller.interface";
import { IUsersController } from "../users/users.controller.interface";
import { HTTPError } from "../errors/http.error";
import { JwtSerice } from "../jwt/jwt.service";

@injectable()
export class AuthController
  extends RouterController
  implements IAuthController
{
  constructor(
    @inject(INVERSIFY_TYPES.Logger) logger: LoggerService,
    @inject(INVERSIFY_TYPES.UsersController) private users: IUsersController,
    @inject(INVERSIFY_TYPES.JwtSerice) private jwtSerice: JwtSerice,
  ) {
    super(logger);

    // { path: "/login", method: "post", func: this.login }
    // тоже самое что и this.router.get("/login", this.login);
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
    const account = await this.users.verification(body);

    if (!account) {
      return next(
        new HTTPError(
          422,
          "Пользователя с таким Email или паролем не существует",
          "LOGIN",
        ),
      );
    }

    const { _id, email, password } = account;
    const jwt = this.jwtSerice.sign(_id, email, password);

    res.status(200).send(jwt);
  }

  async register(
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const account = await this.users.find({ email: body.email });

    if (account) {
      return next(
        new HTTPError(409, "Такой E-mail уже существует", "REGISTER"),
      );
    }

    const { _id, email, password } = await this.users.create(body);
    const jwt = this.jwtSerice.sign(_id, email, password);
    res.status(201).send(jwt);
  }
}
