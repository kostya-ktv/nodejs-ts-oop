import express, {Express} from 'express'
import {Server} from 'http'
import { inject, injectable } from 'inversify';
import { ILogger } from './Services/Logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata'
import { json } from 'body-parser';
import { ExceptionFilter } from './Errors/exception.filter';

@injectable()
export class App {

   app: Express
   port: number
   server: Server

      constructor(
         @inject(TYPES.ILogger)private logger: ILogger, 
         @inject(TYPES.UserController)private userController: UserController, 
         @inject(TYPES.ExceptionFilter)private exceptionFilter: ExceptionFilter,
      ) {
         this.app = express()
         this.port = 8000
      }
      useMiddleware(): void {
         this.app.use(json())
      }

      useRoutes() {
         this.app.use('/users', this.userController.router)
      }
      useExceptionFilters() {
         this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
      }

      public async init() {
         this.useMiddleware()
         this.useRoutes()
         this.useExceptionFilters()
         this.server = this.app.listen(this.port)
         this.logger.log(`SERVER STARTED ON http://localhost:${this.port}`);
      }
}