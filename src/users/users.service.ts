import { inject, injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { UserRegisterDTO } from "./DTO/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.interface";

@injectable()
export class UserService implements IUserService {
   constructor(@inject(TYPES.ConfigService) private configService: IConfigService){}
   async createUser ({email, name, password}: UserRegisterDTO) : Promise<User | null> {
      const newUser = new User(email, name)
      const salt = this.configService.get('SALT')
      await newUser.setPassword(password, Number(salt))
      return null;
   };

   async validateUser (dto: UserRegisterDTO) {
      return true
   }
   
 
}