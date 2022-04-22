import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../Common/base.controller";
import { ILogger } from "../Services/Logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata'
import { IUserController } from "./users.controller.interface";
import { UserLoginDTO } from "./DTO/user-login.dto";
import { UserRegisterDTO } from "./DTO/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.interface";


@injectable()
export class UserController extends BaseController implements IUserController{

   constructor(
      @inject(TYPES.ILogger)private loggerService: ILogger,
      @inject(TYPES.UserService) private userService: IUserService
      ) {
      super(loggerService)
      this.bindRoutes([
         {path: '/register', method: 'post', func: this.register},
         {path: '/login', method: 'post', func: this.login}
      ])
   }
   login(req: Request<{},{}, UserLoginDTO>, res: Response, next: NextFunction) {
      next(new HTTPError(401, 'error authorization', 'login'))      
   }

   async register({body}: Request<{},{}, UserRegisterDTO>, response : Response, next: NextFunction): Promise<void> {
      const result = await this.userService.createUser(body)
      if(!result) return next(new HTTPError(422, 'User alreast exists'))
      this.ok(response, {email: result.email})
   }
}