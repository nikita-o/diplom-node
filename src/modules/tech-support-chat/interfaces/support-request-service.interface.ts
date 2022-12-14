import { IGetChatListParams } from './get-chat-list-params.interface';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { ISendMessage } from './send-message.interface';
import { Message } from '../../../database/schemas/message.schema';
import { User } from '../../../database/schemas/user.schema';

export interface ISupportRequestService {
  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: ISendMessage): Promise<Message>;
  getMessages(supportRequestId: string, user: User): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): void;
}
