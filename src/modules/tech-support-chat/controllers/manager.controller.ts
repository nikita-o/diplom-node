import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { SupportRequestEmployeeService } from '../services/support-request-employee.service';
import { GetListSupportRequestDto } from '../dto/get-list-support-request.dto';
import { ReqUser } from '../../../common/decorators/req-user.decorator';
import { User } from '../../../database/schemas/user.schema';
import { Roles } from '../../../common/decorators/roles.decorator';
import { ERole } from '../../../common/enums/role.enum';
import { AuthenticatedGuard } from '../../../auth/guards/auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('support-requests')
@ApiCookieAuth()
@Controller('manager/support-requests')
@Roles(ERole.Manager)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class ManagerController {
  constructor(
    private supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  @Get()
  async getListSupportRequest(
    @Query() data: GetListSupportRequestDto,
    @ReqUser() user: User,
  ): Promise<SupportRequest[]> {
    return await this.supportRequestEmployeeService.getListSupportRequest(
      data,
      user,
    );
  }
}
