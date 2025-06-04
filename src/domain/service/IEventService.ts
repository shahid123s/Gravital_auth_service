import { UserCreatedEvent, OTPSentEvent } from '../entities/Event';

export interface IEventService {
  publishUserCreatedEvent(event: UserCreatedEvent): Promise<void>;
  publishOTPSentEvent(event: OTPSentEvent): Promise<void>;
}