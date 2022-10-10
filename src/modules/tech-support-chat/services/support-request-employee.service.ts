import { BadRequestException, Injectable } from '@nestjs/common';
import { ISupportRequestEmployeeService } from '../interfaces/support-request-employee-service.interface';
import {
  Message,
  MessageDocument,
} from '../../../database/schemas/message.schema';
import { IMarkMessagesAsRead } from '../interfaces/mark-messages-as-read.interface';
import { InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../../../database/schemas/support-request.schema';
import { Model } from 'mongoose';

@Injectable()
export class SupportRequestEmployeeService
  implements ISupportRequestEmployeeService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
  ) {}

  async closeRequest(supportRequestId: string): Promise<void> {
    await this.supportRequestModel.findByIdAndUpdate(supportRequestId, {
      $set: { isActive: false },
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
      (message) => !message.readAt && message.author === supportRequest.user,
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
      if (!message.readAt && message.author === params.userId) {
        message.readAt = new Date();
        await message.save();
      }
    }
  }
}
