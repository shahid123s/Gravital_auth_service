import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserSendOtpRequestDTO } from "../../infrastructure/web/DTO/UserDTO";
import {v4 as uuidv4} from 'uuid'
import { generateOtp } from "../../utils/genrate.otp";
import { RedisCache } from "../../infrastructure/cache/redis/redisCache";
import { hashPassword } from "../../utils/passwordUtil";

export class SendOTPUseCase {
    constructor(
        private userRepository: IUserRepository,
        private cache: RedisCache,
    ) {}

    async execute(userData: UserSendOtpRequestDTO): Promise<boolean> {

        const isExistingUser = await this.userRepository.findByEmailOrUsername(userData.email, userData.username);
        if (isExistingUser) {
            throw new Error("User already exists with this email.");
        }
        
        const otp = generateOtp();
        const otpCacheKey = `otp:${userData.email}`;
        const otpCacheValue = {
            email: userData.email,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
        };
        await this.cache.set(otpCacheKey, otpCacheValue, 5 * 60); // Set OTP in cache with 5 minutes TTL
        console.log(`OTP for ${userData.email} is ${otp}`);

        // Create a temporary user cache entry
        const hashedPassword = await hashPassword(userData.password)
        console.log(hashedPassword)
        const temporaryUserCacheKey = `tempUser:${userData.email}`;
        const temporaryUserCacheValue = {
            email: userData.email,
            fullname: userData.fullname,
            username: userData.username,
            password: hashedPassword, // Store password temporarily (should be hashed before saving to DB)
            role: "user", // Default role
            isActive: false, // User is not active until registration is completed
            expiresAt: Date.now() + 5 * 60 * 1000, // Cache valid for 5 minutes
        }

        await this.cache.set(temporaryUserCacheKey, temporaryUserCacheValue, 6.9 * 60); // Set temporary user in cache with 5 minutes TTL
    

        // implementation of kafka 


        return true
    }
}