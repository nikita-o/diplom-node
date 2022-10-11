import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { Hotel, HotelSchema } from '../../database/schemas/hotel.schema';
import {
  HotelRoom,
  HotelRoomSchema,
} from '../../database/schemas/hotel-room.schema';
import {
  Reservation,
  ReservationSchema,
} from '../../database/schemas/reservation.schema';
import { Message, MessageSchema } from '../../database/schemas/message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from '../../database/schemas/support-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
