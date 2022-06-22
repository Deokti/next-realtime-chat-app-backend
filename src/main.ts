import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { AuthController } from "./auth/auth.controller";
import { IAuthController } from "./auth/auth.controller.interface";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { DatabaseService } from "./database/database.service";
import { IDatabaseService } from "./database/database.service.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { JwtService } from "./jwt/jwt.service";
import { IJwtService } from "./jwt/jwt.service.interface";
import { LoggerService } from "./logger/logger.service";
import { ILoggerService } from "./logger/logger.service.interface";
import { UsersController } from "./users/users.controller";
import { IUsersController } from "./users/users.controller.interface";
import { UsersRepository } from "./users/users.repository";
import { IUsersRepository } from "./users/users.repository.interface";
import { UsersService } from "./users/users.service";
import { IUsersService } from "./users/users.service.interface";

const appBinding = new ContainerModule((bind) => {
  bind<ILoggerService>(INVERSIFY_TYPES.Logger).to(LoggerService);
  bind<IAuthController>(INVERSIFY_TYPES.AuthController).to(AuthController);
  bind<IConfigService>(INVERSIFY_TYPES.ConfigService).to(ConfigService);
  bind<IDatabaseService>(INVERSIFY_TYPES.DatabaseService).to(DatabaseService);
  bind<IUsersController>(INVERSIFY_TYPES.UsersController).to(UsersController);
  bind<IUsersService>(INVERSIFY_TYPES.UsersService).to(UsersService);
  bind<IUsersRepository>(INVERSIFY_TYPES.UsersRepository).to(UsersRepository);
  bind<IExeptionFilter>(INVERSIFY_TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IJwtService>(INVERSIFY_TYPES.JwtSerice).to(JwtService);

  bind<App>(INVERSIFY_TYPES.App).to(App);
});

function bootstrap(): void {
  const appContainer = new Container();
  appContainer.load(appBinding);

  const app = appContainer.get<App>(INVERSIFY_TYPES.App);
  app.init();
}

bootstrap();
