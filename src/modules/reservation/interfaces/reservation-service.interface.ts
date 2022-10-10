import { Reservation } from '../../../database/schemas/reservation.schema';
import { IReservationSearchOptions } from './reservation-search-options.interface';
import { ReservationDto } from '../dto/reservation.dto';
import { User } from '../../../database/schemas/user.schema';

export interface IReservationService {
  addReservation(data: ReservationDto, user: User): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
