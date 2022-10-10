import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/schemas/user.schema';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('admin/users')
  async createUser(): Promise<User> {}

  @Get('admin/users')
  @Get('manager/users')
  async getListUsers(): Promise<User[]> {}
}
