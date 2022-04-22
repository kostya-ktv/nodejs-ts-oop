import { Response, Router } from "express";
import { injectable } from "inversify";
import { ILogger } from "../Services/Logger/logger.interface";
import { IControllerRoute } from "./route.interface";
import 'reflect-metadata'
@injectable()
export abstract class BaseController {
   private readonly _router: Router

   constructor(private logger: ILogger) {
      this._router = Router()
   }

   get router() {
      return this._router
   }
   public send<T>(res: Response,code: number, msg: T) {
      res.type('application/json')
      return res.status(code).json(msg)
   }
   public ok<T>(res: Response, msg: T) {
     return this.send<T>(res, 200, msg)
   }
   public created(res: Response) {
      return res.sendStatus(200)
   }
   protected bindRoutes(routes: IControllerRoute[]) {
      for(const route of routes) {

         this.logger.log(`[${route.method}] ${route.path}`)  
         const middleware = route.middlewares?.map(m => m.execute.bind(m))
         //pass context 
         const handler = route.func.bind(this)
         //set methods in router
         const pipeline = middleware ? [...middleware, handler] : handler
         this.router[route.method](route.path, pipeline)
      }
   }
}