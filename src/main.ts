import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { AuthController } from "./auth/auth.controller";
import { ConfigService } from "./config/config.service";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { DatabaseService } from "./database/database.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { JwtSerice } from "./jwt/jwt.service";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { IUsersController } from "./users/users.controller.interface";
import { UsersRepository } from "./users/users.repository";
import { UsersService } from "./users/users.service";

const appBinding = new ContainerModule((bind) => {
  bind<LoggerService>(INVERSIFY_TYPES.Logger).to(LoggerService);
  bind<AuthController>(INVERSIFY_TYPES.AuthController).to(AuthController);
  bind<ConfigService>(INVERSIFY_TYPES.ConfigService).to(ConfigService);
  bind<DatabaseService>(INVERSIFY_TYPES.DatabaseService).to(DatabaseService);
  bind<IUsersController>(INVERSIFY_TYPES.UsersController).to(UsersController);
  bind<UsersService>(INVERSIFY_TYPES.UsersService).to(UsersService);
  bind<UsersRepository>(INVERSIFY_TYPES.UsersRepository).to(UsersRepository);
  bind<ExeptionFilter>(INVERSIFY_TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<JwtSerice>(INVERSIFY_TYPES.JwtSerice).to(JwtSerice);

  bind<App>(INVERSIFY_TYPES.App).to(App);
});

function bootstrap(): void {
  const appContainer = new Container();
  appContainer.load(appBinding);

  const app = appContainer.get<App>(INVERSIFY_TYPES.App);
  app.init();
}

bootstrap();
