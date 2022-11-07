import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './hotel-room.service';
import { Hotel } from '../../database/schemas/hotel.schema';
import { HotelRoom } from '../../database/schemas/hotel-room.schema';
import { AddHotelDto } from './dto/add-hotel.dto';
import { GetHotelsDto } from './dto/get-hotels.dto';
import { UpdateHotelDto } from './dto/updateHotel.dto';
import { AddRoomDto } from './dto/add-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { ERole } from '../../common/enums/role.enum';
import { AuthenticatedGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('hotels')
@ApiCookieAuth()
@Controller('admin')
@Roles(ERole.Admin)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class AdminController {
  constructor(
    private hotelService: HotelService,
    private hotelRoomService: HotelRoomService,
  ) {}

  @Post('hotels')
  async addHotel(@Body() data: AddHotelDto): Promise<Hotel> {
    return await this.hotelService.create(data);
  }

  @Get('hotels')
  async getListHotels(@Query() params: GetHotelsDto): Promise<Hotel[]> {
    return await this.hotelService.getListHotels(params);
  }

  @Put('hotels/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() data: UpdateHotelDto,
  ): Promise<Hotel> {
    console.log(123);
    return await this.hotelService.updateHotel(id, data);
  }

  // FIXME: файлы
  @Post('hotel-rooms')
  async addRoom(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: AddRoomDto,
  ): Promise<HotelRoom> {
    return await this.hotelRoomService.create({
      description: data.description,
      hotel: data.hotelId as unknown as Hotel, // FIXME: кринж
      images: photos.map((file: Express.Multer.File) => file.path),
    });
  }

  // FIXME: файлы
  @Post('hotel-rooms/:id')
  async updateRoom(
    @Param('id') id: string,
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() data: UpdateRoomDto,
  ): Promise<HotelRoom> {
    return await this.hotelRoomService.update(id, {
      images: photos?.map((file: Express.Multer.File) => file.path),
      isEnabled: data.isEnabled,
      description: data.description,
      hotel: data.hotelId as unknown as Hotel, // FIXME: кринж
    });
  }
}
