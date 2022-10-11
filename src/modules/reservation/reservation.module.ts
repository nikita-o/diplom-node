import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ClientController } from './client.controller';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HotelRoom,
  HotelRoomSchema,
} from '../../database/schemas/hotel-room.schema';
import {
  Reservation,
  ReservationSchema,
} from '../../database/schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [ReservationService],
  controllers: [ClientController, ManagerController],
})
export class ReservationModule {}
