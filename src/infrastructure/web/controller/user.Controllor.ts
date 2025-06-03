import { Request, Response } from "express";
import { SendOTPUseCase } from "../../../application/usecase/register.usecase";
import { UserSendOtpRequestDTO } from "../DTO/UserDTO";

export class AuthController {
    constructor(
        private sendOTPUseCase: SendOTPUseCase
    ){}

    async sendOtp(req: Request, res: Response):Promise<void>{
       try {
        console.log(req.body)
        const reqData : UserSendOtpRequestDTO = req.body;
        const createStudent = await this.sendOTPUseCase.execute(reqData);
        res.status(201).json({ data: createStudent, message: "Student created successfully" });
       } catch (error) {
        res.status(400).json({ error: (error as Error).message, message: "Failed to create student" });
       }
    }
}