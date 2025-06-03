import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserSendOtpRequestDTO } from "../../infrastructure/web/DTO/UserDTO";


export class SendOTPUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(userData: UserSendOtpRequestDTO): Promise<boolean> {

        const isExistingUser = await this.userRepository.findByEmail(userData.email)
        console.log(isExistingUser)
        if (isExistingUser) {
            throw new Error("User already exists with this email.");
        }
        
        // Here you would typically generate an OTP and send it to the user's email
        // For simplicity, we are just simulating this step
        console.log(`Sending OTP to ${userData.email}`);
        // Simulate sending OTP
        // In a real application, you would use an email service to send the OTP
        // Example: await emailService.sendOtp(userData.email, otp);
        // Simulate OTP generation
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        console.log(`Generated OTP: ${otp}`);
        // Here you would save the OTP to a cache or database with an expiration time
        // Example: await cacheService.set(`otp:${userData.email}`, otp.toString(), 300); // 5 minutes TTL
        // Simulate saving OTP to cache
        console.log(`Saving OTP for ${userData.email} in cache`);
        // Simulate cache save
        // In a real application, you would use a cache service to save the OTP
        // Example: await cacheService.set(`otp:${userData.email}`, otp.toString(), 300); // 5 minutes TTL
        console.log(`OTP for ${userData.email} saved successfully`);
        // Return true to indicate that the OTP was sent successfully
        console.log(`OTP sent successfully to ${userData.email}`);
        // In a real application, you would return a success response
        console.log(`User registration process completed for ${userData.email}`);
        // Simulate successful OTP sending
        console.log(`User registration process completed for ${userData.email}`);
        // Return true to indicate that the OTP was sent successfully
        console.log(`User registration process completed for ${userData.email}`);

        return true
    }
}