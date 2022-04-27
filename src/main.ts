import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { INVERSIFY_TYPES } from "./config/inversify.types";
import { LoggerService } from "./logger/logger.service";

const appBinding = new ContainerModule((bind) => {
  bind<LoggerService>(INVERSIFY_TYPES.Logger).to(LoggerService);

  bind<App>(INVERSIFY_TYPES.App).to(App);
});

function bootstrap(): void {
  const appContainer = new Container();
  appContainer.load(appBinding);

  const app = appContainer.get<App>(INVERSIFY_TYPES.App);
  app.init();
}

bootstrap();
