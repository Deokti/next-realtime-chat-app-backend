import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { INVERSIFY_TYPES } from "../config/inversify.types";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "./http.error";

@injectable()
export class ExeptionFilter {
  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: LoggerService) { }

  public catch(
    error: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Code ${error.statusCode} ${error.message}`,
      );
      res.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
        context: error.context,
      });
    } else {
      this.logger.error(error.message);
      res.status(500).send(error.message);
    }
  }
}
