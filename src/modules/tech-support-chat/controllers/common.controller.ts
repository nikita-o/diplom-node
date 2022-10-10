import { Controller, Get, Post } from '@nestjs/common';
import { Message } from '../../../database/schemas/message.schema';

@Controller('common/support-requests')
export class ClientController {
  @Get(':id/messages')
  getHistoryMessage(): Promise<Message> {}

  @Post(':id/messages')
  sendMessage(): Promise<Message> {}

  @Post(':id/messages/read')
  readMessages(): Promise<Message> {}
}
