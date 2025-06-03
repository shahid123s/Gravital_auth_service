
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { SQLUserRepository } from "../infrastructure/database/SQL/repository/auth.repository";
import { SendOTPUseCase } from "../application/usecase/register.usecase";
import { AuthController } from "../infrastructure/web/controller/user.Controllor";






import { CorsService } from "../infrastructure/service/cors.services";
import { loadCorsConfig } from "../config/cors.config";

export interface Container {
    corsService: CorsService;
    UserRepository: IUserRepository;
    sendOtpUseCase: SendOTPUseCase;
    authController: AuthController;
}

export const createContainer = (): Container => {
    // Services
    const corsConfig = loadCorsConfig();
    const corsService = new CorsService(corsConfig);

    // Repositories
    const UserRepository = new SQLUserRepository();


    // Student Use Cases
    const sendOtpUseCase = new SendOTPUseCase(UserRepository);


    // Admin Use Cases


    // Controllers
    const authController = new AuthController(
        sendOtpUseCase,
    );

    

    return {
        corsService,
        UserRepository,
        sendOtpUseCase,
        authController,
    };
}