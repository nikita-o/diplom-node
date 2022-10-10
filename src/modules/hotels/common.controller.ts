import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoom } from '../../database/schemas/hotel-room.schema';
import { SearchRoomsDto } from './dto/search-rooms.dto';

// TODO: Потом роли добавить
@Controller('common/hotel-rooms')
export class CommonController {
  constructor(private hotelRoomService: HotelRoomService) {}

  @Get()
  async searchRooms(@Query() data: SearchRoomsDto): Promise<HotelRoom[]> {
    return await this.hotelRoomService.search({
      limit: data.limit,
      offset: data.offset,
      title: data.hotel,
      isEnabled: true,
    });
  }

  @Get(':id')
  async infoRoomById(@Param('id') id: string): Promise<HotelRoom> {
    return await this.hotelRoomService.findById(id, true);
  }
}
