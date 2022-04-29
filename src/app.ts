import { inject, injectable } from "inversify";
import "reflect-metadata";
import { AuthController } from "./auth/auth.controller";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { LoggerService } from "./logger/logger.service";
import express, { Express } from "express";
import { json } from "body-parser";

@injectable()
export class App {
  app: Express;
  port: number;
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
    @inject(INVERSIFY_TYPES.AuthController)
    private authController: AuthController,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useAuthRoutes(): void {
    this.app.use("/auth", this.authController.router);
  }

  useJson(): void {
    this.app.use(json());
  }

  public init(): void {
    this.useJson();
    this.useAuthRoutes();

    this.app.listen(this.port);
    this.logger.info(`Сервер запущен на http://localhost:${this.port}`);
  }
}
