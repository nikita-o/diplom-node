import { BadRequestException, Injectable } from '@nestjs/common';
import { ISupportRequestClientService } from '../interfaces/support-request-client-service.interface';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../../../database/schemas/support-request.schema';
import { ICreateSupportRequest } from '../interfaces/create-support-request.interface';
import {
  Message,
  MessageDocument,
} from '../../../database/schemas/message.schema';
import { IMarkMessagesAsRead } from '../interfaces/mark-messages-as-read.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async createSupportRequest(
    data: ICreateSupportRequest,
  ): Promise<SupportRequest> {
    const message: Message = await this.messageModel.create({
      author: data.userId,
      text: data.text,
    });
    return this.supportRequestModel.create({
      user: data.userId,
      messages: [message],
      isActive: true,
    });
  }

  // TODO: Это блять не count.
  async getUnreadCount(supportRequestId: string): Promise<Message[]> {
    const supportRequest: SupportRequest | null = await this.supportRequestModel
      .findById(supportRequestId)
      .exec();
    if (!supportRequest) {
      throw new BadRequestException('No SupportRequest');
    }
    return supportRequest.messages.filter(
      (message) => !message.readAt && message.author !== supportRequest.user,
    );
  }

  async markMessagesAsRead(params: IMarkMessagesAsRead): Promise<void> {
    const supportRequest: SupportRequest | null = await this.supportRequestModel
      .findById(params.supportRequestId)
      .exec();
    if (!supportRequest) {
      throw new BadRequestException('No SupportRequest');
    }
    for (const message of <MessageDocument[]>supportRequest.messages) {
      // FIXME: И че с ним делать
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!message.readAt && message.author !== params.userId) {
        message.readAt = new Date();
        await message.save();
      }
    }
  }
}
