import { Router } from "express";
import { AuthController } from "../controller/auth.Controllor";


export  const makeAuthRoute = (studentController: AuthController) => {
    const router = Router();

    router.post('/', (req,  res) => studentController.sendOtp(req, res))
    return router;

}

