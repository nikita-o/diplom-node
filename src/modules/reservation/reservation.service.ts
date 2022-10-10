import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../../database/schemas/reservation.schema';
import { IReservationService } from './interfaces/reservation-service.interface';
import { IReservationSearchOptions } from './interfaces/reservation-search-options.interface';
import { ReservationDto } from './dto/reservation.dto';
import {
  HotelRoom,
  HotelRoomDocument,
} from '../../database/schemas/hotel-room.schema';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  getReservations(filter: IReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationModel
      .find({
        user: filter.userId,
        dateStart: { $gte: filter.dateStart, $lt: filter.dateEnd },
        dateEnd: { $gte: filter.dateStart, $lt: filter.dateEnd },
      })
      .exec();
  }

  async addReservation(data: ReservationDto, user: User): Promise<Reservation> {
    const reservation: Reservation | null = await this.reservationModel.findOne(
      {
        room: data.hotelRoom as unknown as HotelRoom,
        dateStart: { $gte: data.startDate, $lt: data.endDate },
        dateEnd: { $gte: data.startDate, $lt: data.endDate },
      },
    );
    if (!reservation) {
      throw new BadRequestException('room busy');
    }
    return this.reservationModel.create({
      ...data,
      hotel: reservation.room.hotel,
      room: reservation.room,
      user,
    });
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.remove({ id });
  }

  async removeReservationUser(
    idReservation: string,
    idUser: string,
  ): Promise<void> {
    const reservation: ReservationDocument | null = await this.reservationModel
      .findOne({ id: idReservation, user: idUser })
      .exec();
    if (!reservation) {
      throw new BadRequestException();
    }
    await reservation.remove();
  }

  getUserReservations(user: User): Promise<Reservation[]> {
    return this.reservationModel.find({ user }).exec();
  }
}
