import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { ApiBody, ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        hotelId: { type: 'string' },
        photos: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @Post('hotel-rooms')
  @UseInterceptors(FileInterceptor('photos'))
  async addRoom(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        .addMaxSizeValidator({ maxSize: 1000 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    photos: Express.Multer.File[],
    @Body() data: AddRoomDto,
  ): Promise<HotelRoom> {
    console.log(photos);
    return await this.hotelRoomService.create({
      description: data.description,
      hotel: data.hotelId as unknown as Hotel, // FIXME: кринж
      images: photos.map((file: Express.Multer.File) => file.path),
    });
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        hotelId: { type: 'string' },
        isEnabled: { type: 'boolean' },
        photos: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @Post('hotel-rooms/:id')
  async updateRoom(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg' })
        .addMaxSizeValidator({ maxSize: 1000 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    photos: Express.Multer.File[],
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
