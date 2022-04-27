import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { LoggerService } from "./logger/logger.service";

@injectable()
export class App {
  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) { }

  public init(): void {
    this.logger.info("Сервер запущен");
  }
}
