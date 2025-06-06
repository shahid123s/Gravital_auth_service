 
export interface  IAppConfig { 
    app: {
        port : number;
        environment: string;    
    },
    db: {
        uri: string;
    },
    cors: {
        origin: string;
    },
    jwt: {
        accessSecret: string;
        accessExpiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    },
    redis: {
        host: string;
        port: number;
        password?: string;
        db?: number;
    }

}