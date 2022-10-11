import { BadRequestException, Injectable } from '@nestjs/common';
import { ISupportRequestService } from '../interfaces/support-request-service.interface';
import { IGetChatListParams } from '../interfaces/get-chat-list-params.interface';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../../../database/schemas/support-request.schema';
import {
  Message,
  MessageDocument,
} from '../../../database/schemas/message.schema';
import { ISendMessage } from '../interfaces/send-message.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter } from 'events';
import { User } from '../../../database/schemas/user.schema';
import { ERole } from '../../../common/enums/role.enum';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  private sendMessageEvent: EventEmitter = new EventEmitter();

  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  findSupportRequests(params: IGetChatListParams): Promise<SupportRequest[]> {
    return this.supportRequestModel
      .find({
        user: params.userId,
        isActive: params.isActive,
      })
      .exec();
  }

  async getMessages(supportRequestId: string, user: User): Promise<Message[]> {
    const supportRequest: SupportRequest | null = await this.supportRequestModel
      .findById(supportRequestId)
      .exec();
    if (!supportRequest) {
      throw new BadRequestException('No supportRequest');
    }
    if (user.role === ERole.Client && supportRequest.user === user) {
      throw new BadRequestException();
    }
    return supportRequest.messages;
  }

  async sendMessage(data: ISendMessage): Promise<Message> {
    const supportRequest: SupportRequestDocument | null =
      await this.supportRequestModel.findById(data.supportRequestId).exec();
    if (!supportRequest) {
      throw new BadRequestException('No SupportRequest');
    }
    const message: MessageDocument = new this.messageModel({
      author: data.authorId,
      text: data.text,
    });
    await message.save();
    supportRequest.messages.push(message);
    await supportRequest.save();
    this.sendMessageEvent.emit('send-message', {
      supportRequest,
      message,
    });
    return message;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): void {
    this.sendMessageEvent.on(
      'send-message',
      (supportRequest: SupportRequest, message: Message) =>
        handler(supportRequest, message),
    );
  }
}
