import { Express } from "express";
import { makeAuthRoute } from "../infrastructure/web/route/auth.route";
import { Container } from "./container";


export const setupRoute = (app: Express, container: Container): void => {
    app.use('/api/auth', makeAuthRoute(container.authController));
}