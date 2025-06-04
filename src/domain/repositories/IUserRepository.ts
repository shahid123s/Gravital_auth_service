import { User } from "../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findByEmailOrUsername(email: string, username: string): Promise<User | null>
    // getUserById(id: number): Promise<any> 
    // getUserByUsername(username: string): Promise<any> 
    // updateUser(id: number, userData: any):
    // deleteUser(id: number): Promise<void> 
}