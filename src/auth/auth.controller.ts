import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ReqUser } from '../common/decorators/req-user.decorator';
import { User, UserDocument } from '../database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LocalLoginGuard } from './guards/local-login.guard';
import { AuthenticatedGuard } from './guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalLoginGuard)
  async login(
    @ReqUser() user: User,
  ): Promise<Pick<User, 'email' | 'name' | 'contactPhone'>> {
    return {
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    };
  }

  @Post('auth/logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: any): void {
    req.logout(() => undefined);
  }

  @Get('auth/check')
  @UseGuards(AuthenticatedGuard)
  test(@ReqUser() user: User): User {
    return user;
  }

  @Post('client/register')
  async register(
    @Body() data: RegisterDto,
  ): Promise<Pick<UserDocument, 'id' | 'email' | 'name'>> {
    return await this.authService.register(data);
  }
}
