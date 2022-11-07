import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HotelRoom,
  HotelRoomDocument,
} from '../../database/schemas/hotel-room.schema';
import { IHotelRoomService } from './interfaces/hotel-room-service.interface';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.hotelRoomModel.create(data);
  }

  async findById(id: string, isEnabled?: boolean): Promise<HotelRoom> {
    const params: { _id: string; isEnabled?: boolean } = { _id: id };
    if (isEnabled) {
      // Потому что иначе нельзя с mongoose
      params.isEnabled = true;
    }
    const hotelRoom: HotelRoom | null = await this.hotelRoomModel
      .findOne(params)
      .exec();
    if (!hotelRoom) {
      throw new BadRequestException('No hotelRoom');
    }
    return hotelRoom;
  }

  search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
    if (!params.isEnabled) {
      // Потому что иначе нельзя с mongoose
      delete params.isEnabled;
    }
    return this.hotelRoomModel
      .find({ isEnabled: params.isEnabled })
      .populate({ path: 'hotel', match: { title: params.title } })
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }

  async update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const hotelRoom: HotelRoom | null = await this.hotelRoomModel
      .findByIdAndUpdate(id, data)
      .exec();
    if (!hotelRoom) {
      throw new BadRequestException('No hotelRoom');
    }
    return hotelRoom;
  }
}
