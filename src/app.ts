import { inject, injectable } from "inversify";
import "reflect-metadata";
import { AuthController } from "./auth/auth.controller";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { LoggerService } from "./logger/logger.service";
import express, { Express } from "express";
import { json } from "body-parser";
import { ConfigService } from "./config/config.service";
import { DatabaseService } from "./database/database.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IUsersController } from "./users/users.controller.interface";
import { UsersController } from "./users/users.controller";

@injectable()
export class App {
  app: Express;
  port: number;
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: ConfigService,
    @inject(INVERSIFY_TYPES.AuthController) private auth: AuthController,
    @inject(INVERSIFY_TYPES.DatabaseService) private database: DatabaseService,
    @inject(INVERSIFY_TYPES.ExeptionFilter) private exeption: ExeptionFilter,
    @inject(INVERSIFY_TYPES.UsersController) private users: UsersController,
  ) {
    this.app = express();
    this.port = Number(this.config.get("PORT")) || 8000;
  }

  useRoutes(): void {
    // При передаче пути и роутера интерпретируется как путь мартрутизации.
    // При получении запроса выполняет функции, находящиеся в переданной функции
    this.app.use("/auth", this.auth.router);
    this.app.use("/users", this.users.router);
  }

  useJson(): void {
    // Анализирует приходящий запрос от Frontend
    // и помещает данные в request.body. Если это не сделать,
    // никакие данные при отправке с Frontend по API не появятся в body
    this.app.use(json());
  }

  useExeptionFilter(): void {
    // При передаче четырёх параметров интерпретируется как
    // обработчик событий, который получаем ошибки первым аргументов,
    // а вторым, третьим и четвертым получает request response, next
    this.app.use(this.exeption.catch.bind(this.exeption));
  }

  public async init(): Promise<void> {
    this.useJson();
    this.useRoutes();
    this.useExeptionFilter();

    await this.database.connect();
    this.app.listen(this.port);
    this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
  }
}
