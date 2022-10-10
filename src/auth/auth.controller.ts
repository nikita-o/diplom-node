import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from '../common/decorators/req-user.decorator';
import { User } from '../database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  login(@ReqUser() user: User, @Req() req: any): User {
    req.login(user);
    return user;
  }

  @Post('auth/logout')
  logout(@Req() req: any): void {
    req.logout();
  }

  @Post('client/register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return await this.authService.register(data);
  }
}
