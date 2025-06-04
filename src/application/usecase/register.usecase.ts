import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserSendOtpRequestDTO } from "../../infrastructure/web/DTO/UserDTO";
import {v4 as uuidv4} from 'uuid'

export class SendOTPUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userData: UserSendOtpRequestDTO): Promise<boolean> {


        

        const isExistingUser = await this.userRepository.findByEmailOrUsername(userData.email, userData.username);

        console.log(isExistingUser, 'here')
        if (isExistingUser) {
            throw new Error("User already exists with this email.");
        }

        // const userId = uuidv4()
        
        // const newUser = await this.userRepository.createUser({
        //     id: userId,
        //     fullname: userData.fullname,
        //     username: userData.username,
        //     password: userData.password, // In a real application, ensure to hash the password
        //     email: userData.email,
        //     isActive: true, // Default value
        //     role: 'user' // Default role
        // })
        

      
        return true
    }
}