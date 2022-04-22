import { IConfigService } from "./config.service.interface";
import {config, DotenvConfigOutput, DotenvParseOutput} from "dotenv"
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Logger } from "tslog";

@injectable()
export class ConfigService implements IConfigService {
   private config: DotenvParseOutput

   constructor(@inject(TYPES.ILogger) private logger: Logger) {

      const result: DotenvConfigOutput = config()
      if(result.error) this.logger.error("Unsuccessfully reading .env")
      else this.config = result.parsed as DotenvParseOutput
      
   }
   get (key: string) :string {
      return this.config[key];
   }

}