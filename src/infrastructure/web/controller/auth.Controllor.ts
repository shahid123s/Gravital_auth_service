import { Request, Response } from "express";
import { SendOTPUseCase } from "../../../application/usecase/register.usecase";
import { UserCreateValidationDTO } from "../DTO/UserDTO";
import { ZodError } from "zod";

export class AuthController {
    constructor(
        private sendOTPUseCase: SendOTPUseCase
    ){}

    async sendOtp(req: Request, res: Response):Promise<void>{
       try {
        console.log(req.body)
        const reqData = UserCreateValidationDTO.parse(req.body);
        const createStudent = await this.sendOTPUseCase.execute(reqData);
        res.status(201).json({ data: createStudent, message: "Student created successfully" });
       } catch (error) {
        if(error instanceof ZodError) {
            res.status(400).json({ error: error.errors, message: "Validation failed" });
            return;
        }
        res.status(400).json({ error: (error as Error).message, message: "Failed to create student" });
       }
    }
}