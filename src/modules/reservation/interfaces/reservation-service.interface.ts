import { Reservation } from '../../../database/schemas/reservation.schema';
import { IReservationSearchOptions } from './reservation-search-options.interface';

export interface IReservationService {
  addReservation(data: Reservation): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}
