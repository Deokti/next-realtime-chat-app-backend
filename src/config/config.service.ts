import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { LoggerService } from "../logger/logger.service";
import { INVERSIFY_TYPES } from "./inversify.types";

@injectable()
export class ConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) {
    const configDotenv: DotenvConfigOutput = config();
    if (configDotenv.error) {
      this.logger.error(`${[ConfigService]} ${configDotenv.error}`);
    }
    this.config = configDotenv.parsed as DotenvParseOutput;
  }

  get(key: string): string {
    this.logger.info(`[${key}] ${this.config[key]}`);
    return this.config[key];
  }
}
