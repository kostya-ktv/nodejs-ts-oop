import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { LoggerService } from "./Services/Logger/logger.service";
import { ILogger } from "./Services/Logger/logger.interface";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./Errors/exception.filter";
import { IExceptionFilter } from "./Errors/exception.filter.interface";
import { IUserService } from "./users/users.interface";
import { IUserController } from "./users/users.controller.interface";
import { UserService } from "./users/users.service";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {

   bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
   bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope()
   bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope()
   bind<App>(TYPES.Application).to(App).inSingletonScope()
   bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
   bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()

})
const bootstrap = () => {
   const appContainer = new Container()
   appContainer.load(appBindings)
   const app = appContainer.get<App>(TYPES.Application)
   app.init()
   return {appContainer, app}

}
   
 
   
   export const {app, appContainer} = bootstrap()

