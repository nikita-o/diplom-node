import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { SupportRequestClientService } from '../services/support-request-client.service';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto';
import { ReqUser } from '../../../common/decorators/req-user.decorator';
import { User, UserDocument } from '../../../database/schemas/user.schema';
import { GetListSupportRequestDto } from '../dto/get-list-support-request.dto';

@Controller('client/support-requests')
export class ClientController {
  constructor(
    private supportRequestClientService: SupportRequestClientService,
  ) {}

  @Post()
  async createSupportRequest(
    @Body() data: CreateSupportRequestDto,
    @ReqUser() user: UserDocument,
  ): Promise<SupportRequest> {
    return await this.supportRequestClientService.createSupportRequest({
      text: data.text,
      userId: user.id,
    });
  }

  @Get()
  async getListSupportRequest(
    @Query() data: GetListSupportRequestDto,
    @ReqUser() user: User,
  ): Promise<SupportRequest[]> {
    return await this.supportRequestClientService.getListSupportRequest(
      data,
      user,
    );
  }
}
