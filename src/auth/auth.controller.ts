import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from '../common/decorators/req-user.decorator';
import { User } from '../database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LocalLoginGuard } from './guards/local-login.guard';
import { AuthenticatedGuard } from './guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalLoginGuard)
  async login(@ReqUser() user: User, @Req() req: any): Promise<User> {
    return user;
  }

  @Post('auth/logout')
  logout(@Req() req: any): void {
    req.logout();
  }

  @Get('auth/check')
  @UseGuards(AuthenticatedGuard)
  test(@ReqUser() user: User): User {
    return user;
  }

  @Post('client/register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return await this.authService.register(data);
  }
}
