import { IUsersController, СonditionFind } from "./users.controller.interface";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { IRegister, IUser, ILogin } from "../interfaces/auth.interface";
import { RouterController } from "../router/router.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http.error";
import { ILoggerService } from "../logger/logger.service.interface";
import { IUsersService } from "./users.service.interface";

const verifiableQuery = ["id", "email"];

@injectable()
export class UsersController
  extends RouterController
  implements IUsersController
{
  constructor(
    @inject(INVERSIFY_TYPES.UsersService) private usersService: IUsersService,
    @inject(INVERSIFY_TYPES.Logger) logger: ILoggerService,
  ) {
    super(logger);

    this.bindRoutes([{ path: "/", method: "get", func: this.get }]);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create(data: IRegister): Promise<IUser> {
    return this.usersService.create(data);
  }

  async verification(data: ILogin): Promise<IUser | null> {
    return this.usersService.verification(data);
  }

  async find(condition: СonditionFind): Promise<IUser | null> {
    return this.usersService.find(condition);
  }

  async get(
    { query }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!isVerificetionQuery(query)) {
      return next(
        new HTTPError(
          409,
          "В качестве кулюча может выступать id или email",
          "USERS",
        ),
      );
    }

    const find = await this.usersService.find(query as СonditionFind);

    if (!find) {
      return next(
        new HTTPError(409, "Такого пользователя не существует", "USERS"),
      );
    }

    res.status(200).json(find);
  }
}

function isVerificetionQuery(query: object): boolean {
  return verifiableQuery.includes(Object.keys(query)[0]);
}
