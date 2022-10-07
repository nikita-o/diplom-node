import { IMarkMessagesAsRead } from './mark-messages-as-read.interface';
import { Message } from '../../../database/schemas/message.schema';

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: IMarkMessagesAsRead): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<Message[]>;
  closeRequest(supportRequest: string): Promise<void>;
}
