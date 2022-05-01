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
  ) {
    this.app = express();
    this.port = Number(this.config.get("PORT")) || 8000;
  }

  useRoutes(): void {
    this.app.use("/auth", this.auth.router);
  }

  useJson(): void {
    this.app.use(json());
  }

  useExeptionFilter(): void {
    this.app.use(this.exeption.catch.bind(this.exeption));
  }

  public init(): void {
    this.useJson();
    this.useRoutes();
    this.useExeptionFilter();

    this.database.connect();
    this.app.listen(this.port);
    this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
  }
}
