interface BaseEvent {
    type: string;
    timestamp: number;
}



export interface UserCreatedEvent extends BaseEvent {
    type: 'user.created';
    data: {
        userId: string;
        fullname: string;
        username: string;
        email: string;
        role: string;
        isActive: boolean;
    }
}

export interface OTPSentEvent extends BaseEvent {
    type: 'otp.sent';
    data: {
        userId: string;
        email: string;
        otp: string;
        createdAt: Date;
    }
}


export type EventType = UserCreatedEvent | OTPSentEvent;


export interface IEventPublisher {
    publish(event: EventType): Promise<void>;
}


export interface IEventService {
    publishUserCreatedEvent(data: UserCreatedEvent): Promise<void>;
    publishOTPSentEvent(event: OTPSentEvent): Promise<void>;
}





