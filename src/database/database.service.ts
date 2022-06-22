import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import "reflect-metadata";
import { IConfigService } from "../config/config.service.interface";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { ILoggerService } from "../logger/logger.service.interface";
import { IDatabaseService } from "./database.service.interface";

@injectable()
export class DatabaseService implements IDatabaseService {
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: IConfigService,
  ) {}

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.config.get("DATABASE_URL"));
      this.logger.info("[CONNECT DATABASE]");
    } catch (error) {
      this.logger.error("[ERROR CONNECT DATABASE]");
    }
  }
}
