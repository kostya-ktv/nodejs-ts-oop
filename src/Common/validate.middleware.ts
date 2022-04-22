import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./middleware.interface";
import {ClassConstructor, plainToClass} from "class-transformer"
import { validate } from "class-validator";

export class ValidateMiddleWare implements IMiddleware {
   constructor (private classToValidate: ClassConstructor<object>) {

   }
   execute({ body }: Request, res: Response, next: NextFunction) {
      const instance = plainToClass(this.classToValidate, body)
      validate(instance).then( errors => {
         if(errors.length) res.status(422).send(errors) 
         else next()
      })
   }
}