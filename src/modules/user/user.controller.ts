import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilService } from '../../common/utils/util.service';
import { GetListUserDto } from './dto/get-list-user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService, private util: UtilService) {}

  @Post('admin/users')
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
  @Get('manager/users')
  async getListUsers(@Query() data: GetListUserDto): Promise<User[]> {
    return this.userService.findAll(data);
  }
}
