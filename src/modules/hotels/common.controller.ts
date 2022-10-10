import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoom } from '../../database/schemas/hotel-room.schema';
import { SearchRoomsDto } from './dto/search-rooms.dto';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { User } from '../../database/schemas/user.schema';

// TODO: Потом роли добавить
@Controller('common/hotel-rooms')
export class CommonController {
  constructor(private hotelRoomService: HotelRoomService) {}

  @Get()
  async searchRooms(
    @Query() data: SearchRoomsDto,
    @ReqUser() user: User,
  ): Promise<HotelRoom[]> {
    return await this.hotelRoomService.search({
      limit: data.limit,
      offset: data.offset,
      title: data.hotel,
      isEnabled: !!user,
    });
  }

  @Get(':id')
  async infoRoomById(
    @Param('id') id: string,
    @ReqUser() user: User,
  ): Promise<HotelRoom> {
    return await this.hotelRoomService.findById(id, !!user);
  }
}
