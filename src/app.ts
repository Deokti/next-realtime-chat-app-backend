import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import express, { Express } from "express";
import { json } from "body-parser";
import { IUsersController } from "./users/users.controller.interface";
import { AuthMiddleware } from "./auth/auth.middleware";
import { ILoggerService } from "./logger/logger.service.interface";
import { IConfigService } from "./config/config.service.interface";
import { IAuthController } from "./auth/auth.controller.interface";
import { IDatabaseService } from "./database/database.service.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IJwtService } from "./jwt/jwt.service.interface";
import cors from "cors";

@injectable()
export class App {
  app: Express;
  port: number | string;
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: IConfigService,
    @inject(INVERSIFY_TYPES.AuthController) private auth: IAuthController,
    @inject(INVERSIFY_TYPES.DatabaseService) private database: IDatabaseService,
    @inject(INVERSIFY_TYPES.ExeptionFilter) private exeption: IExeptionFilter,
    @inject(INVERSIFY_TYPES.UsersController) private users: IUsersController,
    @inject(INVERSIFY_TYPES.JwtSerice) private jwt: IJwtService,
  ) {
    this.app = express();
    this.port = process.env.PORT || 8000;
  }

  useRoutes(): void {
    // При передаче пути и роутера интерпретируется как путь мартрутизации.
    // При получении запроса выполняет функции, находящиеся в переданной функции
    this.app.use("/auth", this.auth.router);
    this.app.use("/users", this.users.router);
  }

  useMiddleware(): void {
    // Анализирует приходящий запрос от Frontend
    // и помещает данные в request.body. Если это не сделать,
    // никакие данные при отправке с Frontend по API не появятся в body
    this.app.use(json());

    const authMiddleware = new AuthMiddleware(this.jwt);
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useExeptionFilter(): void {
    // При передаче четырёх параметров интерпретируется как
    // обработчик событий, который получаем ошибки первым аргументов,
    // а вторым, третьим и четвертым получает request response, next
    this.app.use(this.exeption.catch.bind(this.exeption));
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
      }),
    );
  }

  public async init(): Promise<void> {
    this.useCors();

    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilter();

    await this.database.connect();
    this.app.listen(this.port);
    this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
  }
}
