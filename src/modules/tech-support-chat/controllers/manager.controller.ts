import { Controller, Get, Query } from '@nestjs/common';
import { SupportRequest } from '../../../database/schemas/support-request.schema';
import { SupportRequestEmployeeService } from '../services/support-request-employee.service';
import { GetListSupportRequestDto } from '../dto/get-list-support-request.dto';
import { ReqUser } from '../../../common/decorators/req-user.decorator';
import { User } from '../../../database/schemas/user.schema';

@Controller('manager/support-requests')
export class ClientController {
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
