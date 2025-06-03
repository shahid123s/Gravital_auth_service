import express from "express";
import { config } from "dotenv";
import { createContainer } from "./container";
import { PrismaClient } from "@prisma/client";
import { setupRoute } from "./routes";
import morgan from 'morgan'
import cors from 'cors';
config();

const startServer = async () : Promise<void> => {
    const app = express();
    app.use(express.json());

    const prisma = new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        errorFormat: 'minimal',
    });



    const container = createContainer();

    app.use(cors(container.corsService.getCorsOptions()));
    app.use(morgan('dev'));
    setupRoute(app, container);

    const PORT = process.env.PORT || 3009;

    app.listen(PORT, async() => {
        try {
            await prisma.$connect();
            console.log(`Server is running on port ${PORT}`);
            
        } catch (error) {
            console.log(error)
        }
    })
};

startServer().catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
});
