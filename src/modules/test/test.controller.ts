import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private test: TestService) {}

  @Get('seeding')
  async seeding(): Promise<void> {
    await this.test.seeding();
  }

  @Get('clear_db')
  async clearDB(): Promise<void> {
    await this.test.clearDB();
  }
}
