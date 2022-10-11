import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from '../../database/schemas/hotel.schema';
import {
  HotelRoom,
  HotelRoomSchema,
} from '../../database/schemas/hotel-room.schema';
import { AdminController } from './admin.controller';
import { CommonController } from './common.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelService, HotelRoomService],
  controllers: [AdminController, CommonController],
})
export class HotelModule {}
