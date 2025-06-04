import { UserCreatedEvent, OTPSentEvent, IEventPublisher } from '../../domain/entities/Event';
import { IEventService } from '../../domain/service/IEventService';


export class EvnetService implements IEventService {
    constructor(private publisher: IEventPublisher) { }


    async publishUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
        try {

            // where the data is assigned to the eventData object
            const eventData: UserCreatedEvent ={ 
                type: "user.created",
                data: {
                    userId: event.data.userId,
                    fullname: event.data.fullname,
                    username: event.data.username,
                    email: event.data.email,
                    role: event.data.role,
                    isActive: event.data.isActive
                },
                timestamp: Date.now()
            };
            // publish the event using the publisher
            await this.publisher.publish(eventData);


        } catch (error) {
            console.log(error)
            throw new Error('Method not implemented.');
        }

    }
    async publishOTPSentEvent(event: OTPSentEvent): Promise<void> {
        try {
            const eventData: OTPSentEvent = {
                type: "otp.sent",
                data: {
                    userId: event.data.userId,
                    email: event.data.email,
                    otp: event.data.otp,
                    createdAt: event.data.createdAt
                },
                timestamp: Date.now()
            };

            await this.publisher.publish(eventData);
        } catch (error) {
        throw new Error('Method not implemented.');

        }
    }
}