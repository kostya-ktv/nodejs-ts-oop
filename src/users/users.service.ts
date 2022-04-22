import { injectable } from "inversify";
import { UserRegisterDTO } from "./DTO/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.interface";

@injectable()
export class UserService implements IUserService {
   async createUser ({email, name, password}: UserRegisterDTO) : Promise<User | null> {
      const newUser = new User(email, name)
      await newUser.setPassword(password)
      return null;
   };

   async validateUser (dto: UserRegisterDTO) {
      return true
   }
   
 
}