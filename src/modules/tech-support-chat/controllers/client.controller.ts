import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { SupportRequestClientService } from '../services/support-request-client.service';
import { CreateSupportRequestDto } from '../dto/create-support-request.dto';
import { ReqUser } from '../../../common/decorators/req-user.decorator';
import { User, UserDocument } from '../../../database/schemas/user.schema';
import { GetListSupportRequestDto } from '../dto/get-list-support-request.dto';
import { AuthenticatedGuard } from '../../../auth/guards/auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ERole } from '../../../common/enums/role.enum';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('support-requests')
@ApiCookieAuth()
@Controller('client/support-requests')
@Roles(ERole.Client)
@UseGuards(AuthenticatedGuard, RolesGuard)
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
