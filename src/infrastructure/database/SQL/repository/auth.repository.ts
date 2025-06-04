import { PrismaClient } from "@prisma/client";
import { User } from "../../../../domain/entities/User";
import { IUserRepository } from "../../../../domain/repositories/IUserRepository";

const prisma = new PrismaClient();

export class SQLUserRepository implements IUserRepository {

    async createUser(user: User): Promise<User> {
        // Implementation for registering a user in SQL database
        // This is a placeholder implementation
        const createdUser = await prisma.user.create({
            data: {
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                password: user.password, // In a real application, ensure to hash the password
                isActive: user.isActive,
                role: user.role,
            }
        })

        return new User(
            createdUser.id,
            createdUser.fullname,
            createdUser.username,
            createdUser.password,
            createdUser.email,
            createdUser.isActive,
            createdUser.role
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        // Implementation for finding a user by email in SQL database
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return null;
        }

        return new User(
            user.id,
            user.fullname,
            user.username,
            user.password,
            user.email,
            user.isActive,
            user.role
        );
    }


    async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
        // Implementation for finding a user by email and username in SQL database
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });
        if (!user) {
            return null;
        }
        return new User(
            user.id,
            user.fullname,
            user.username,
            user.password,
            user.email,
            user.isActive,
            user.role
        );  
    }
}