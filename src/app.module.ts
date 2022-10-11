import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HotelModule } from './modules/hotels/hotel.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { TechSupportChatModule } from './modules/tech-support-chat/tech-support-chat.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // my modules:
    AuthModule,
    HotelModule,
    ReservationModule,
    TechSupportChatModule,
    UserModule,
    TestModule,
    // globals:
    CommonModule,
  ],
})
export class AppModule {}
