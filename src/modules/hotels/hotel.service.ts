import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../../database/schemas/hotel.schema';
import { IHotelService } from './interfaces/hotel-service.interface';
import { AddHotelDto } from './dto/add-hotel.dto';
import { GetHotelsDto } from './dto/get-hotels.dto';
import { UpdateHotelDto } from './dto/updateHotel.dto';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  create(data: AddHotelDto): Promise<Hotel> {
    return this.hotelModel.create(data);
  }

  async findById(id: string): Promise<Hotel> {
    const hotel: Hotel | null = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new BadRequestException('No hotel');
    }
    return hotel;
  }

  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    return this.hotelModel.find({ title: params.title }).exec();
  }

  getListHotels(params: GetHotelsDto): Promise<Hotel[]> {
    return this.hotelModel
      .find()
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }

  async updateHotel(id: string, data: UpdateHotelDto): Promise<Hotel> {
    const hotel: Hotel | null = await this.hotelModel
      .findByIdAndUpdate(id, data)
      .exec();
    if (!hotel) {
      throw new BadRequestException('No Hotel');
    }
    return hotel;
  }
}
