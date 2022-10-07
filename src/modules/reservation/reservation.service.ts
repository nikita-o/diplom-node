import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../../database/schemas/reservation.schema';
import { IReservationService } from './interfaces/reservation-service.interface';
import { IReservationSearchOptions } from './interfaces/reservation-search-options.interface';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
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

  async addReservation(data: Reservation): Promise<Reservation> {
    const reservation: Reservation | null = await this.reservationModel.findOne(
      {
        room: data.room,
        dateStart: { $gte: data.dateStart, $lt: data.dateEnd },
        dateEnd: { $gte: data.dateStart, $lt: data.dateEnd },
      },
    );
    if (!reservation) {
      throw new BadRequestException('room busy');
    }
    return this.reservationModel.create(data);
  }

  async removeReservation(id: string): Promise<void> {
    await this.reservationModel.remove({ id });
  }
}
