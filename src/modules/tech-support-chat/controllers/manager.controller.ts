import { Controller, Get } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';

@Controller('manager/support-requests')
export class ClientController {
  @Get()
  async getListSupportRequest(): Promise<SupportRequest[]> {}
}
