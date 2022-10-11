import { Module } from '@nestjs/common';
import { SupportRequestService } from './services/support-request.service';
import { SupportRequestClientService } from './services/support-request-client.service';
import { SupportRequestEmployeeService } from './services/support-request-employee.service';
import { ClientController } from './controllers/client.controller';
import { CommonController } from './controllers/common.controller';
import { ManagerController } from './controllers/manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from '../../database/schemas/support-request.schema';
import { Message, MessageSchema } from '../../database/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    SupportRequestService,
    SupportRequestClientService,
    SupportRequestEmployeeService,
  ],
  controllers: [ClientController, CommonController, ManagerController],
})
export class TechSupportChatModule {}
