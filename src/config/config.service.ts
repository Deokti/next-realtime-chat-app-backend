import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ILoggerService } from "../logger/logger.service.interface";
import { INVERSIFY_TYPES } from "./inversify.types";

@injectable()
export class ConfigService {
  private config: DotenvParseOutput;
  private isBuild = false;

  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: ILoggerService) {
    this.isBuild = process.argv.includes("build");

    if (!this.isBuild) {
      const configDotenv: DotenvConfigOutput = config();
      if (configDotenv.error) {
        this.logger.error(`${[ConfigService]} ${configDotenv.error}`);
      }
      this.config = configDotenv.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.isBuild ? (process.env[key] as any) : this.config[key];
  }
}
