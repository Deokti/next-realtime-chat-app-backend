import { inject, injectable } from "inversify";
import mongoose from "mongoose";

import "reflect-metadata";
import { ConfigService } from "../config/config.service";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";

@injectable()
export class DatabaseService {
  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: LoggerService,
    @inject(INVERSIFY_TYPES.ConfigService) private config: ConfigService,
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
