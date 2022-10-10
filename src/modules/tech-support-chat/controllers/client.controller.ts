import { Controller, Get, Post } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';

@Controller('client/support-requests')
export class ClientController {
  @Post()
  async createSupportRequest(): Promise<SupportRequest> {}

  @Get()
  async getListSupportRequest(): Promise<SupportRequest[]> {}
}
