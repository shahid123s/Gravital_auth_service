
export interface OTPCache {
    email: string;
    otp: string;
    expiresAt: number;
}


export interface TemporaryUserCache {
    userId: string;
    email: string;
    fullname: string;
    username: string;
    role: string;
    isActive: boolean;
    expiresAt: number;
}



export interface ICache {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    // exists(key: string): Promise<boolean>;
    // flushAll(): Promise<void>;
    // keys(pattern: string): Promise<string[]>;
}


