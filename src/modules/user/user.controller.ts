import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilService } from '../../common/utils/util.service';
import { GetListUserDto } from './dto/get-list-user.dto';
import { AuthenticatedGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ERole } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiCookieAuth()
@Controller()
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService, private util: UtilService) {}

  @Post('admin/users')
  @Roles(ERole.Admin)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create({
      name: data.name,
      role: data.role,
      contactPhone: data.contactPhone,
      email: data.email,
      passwordHash: this.util.getHash(data.password),
    });
  }

  @Get('admin/users')
  @Roles(ERole.Admin)
  async getListUsersAdmin(@Query() data: GetListUserDto): Promise<User[]> {
    return this.userService.findAll(data);
  }

  @Get('manager/users')
  @Roles(ERole.Manager)
  async getListUsersManager(@Query() data: GetListUserDto): Promise<User[]> {
    return this.userService.findAll(data);
  }
}
