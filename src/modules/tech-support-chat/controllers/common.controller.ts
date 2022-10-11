import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Message } from '../../../database/schemas/message.schema';
import { SupportRequestService } from '../services/support-request.service';
import { ReqUser } from '../../../common/decorators/req-user.decorator';
import { User, UserDocument } from '../../../database/schemas/user.schema';
import { SendMessageDto } from '../dto/send-message.dto';
import { ReadMessageDto } from '../dto/read.message.dto';
import { ERole } from '../../../common/enums/role.enum';
import { SupportRequestClientService } from '../services/support-request-client.service';
import { SupportRequestEmployeeService } from '../services/support-request-employee.service';

@Controller('common/support-requests')
export class ClientController {
  constructor(
    private supportRequestService: SupportRequestService,
    private supportRequestClientService: SupportRequestClientService,
    private supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @Get(':id/messages')
  async getHistoryMessage(
    @Param('id') id: string,
    @ReqUser() user: User,
  ): Promise<Message[]> {
    return await this.supportRequestService.getMessages(id, user);
  }

  @Post(':id/messages')
  async sendMessage(
    @Body() data: SendMessageDto,
    @Param('id') id: string,
    @ReqUser() user: User,
  ): Promise<Message> {
    return await this.supportRequestService.sendMessage({
      text: data.text,
      authorId: user as unknown as string,
      supportRequestId: id,
    });
  }

  @Post(':id/messages/read')
  async readMessages(
    @Body() data: ReadMessageDto,
    @Param('id') id: string,
    @ReqUser() user: UserDocument,
  ): Promise<{ success: true }> {
    switch (user.role) {
      case ERole.Client:
        await this.supportRequestClientService.markMessagesAsRead({
          userId: user.id,
          supportRequestId: id,
          createdBefore: data.createdBefore,
        });
        return { success: true };
      case ERole.Manager:
        await this.supportRequestEmployeeService.markMessagesAsRead({
          userId: user.id,
          supportRequestId: id,
          createdBefore: data.createdBefore,
        });
        return { success: true };
      default:
        throw new BadRequestException();
    }
  }
}
