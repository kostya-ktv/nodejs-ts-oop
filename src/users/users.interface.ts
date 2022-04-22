
import { UserRegisterDTO } from "./DTO/user-register.dto";
import { User } from "./user.entity";

export interface IUserService {
   createUser: (dto: UserRegisterDTO) => Promise<User  | null>
   validateUser: (dto: UserRegisterDTO) => Promise<boolean>
}