import { ICreateSupportRequest } from './create-support-request.interface';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { IMarkMessagesAsRead } from './mark-messages-as-read.interface';
import { Message } from '../../../database/schemas/message.schema';

export interface ISupportRequestClientService {
  createSupportRequest(data: ICreateSupportRequest): Promise<SupportRequest>;
  markMessagesAsRead(params: IMarkMessagesAsRead): Promise<void>;
  getUnreadCount(supportRequest: string): Promise<Message[]>;
}
