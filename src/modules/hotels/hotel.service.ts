import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../../database/schemas/hotel.schema';
import { IHotelService } from './interfaces/hotel-service.interface';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
  ) {}

  create(data: any): Promise<Hotel> {
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
}
