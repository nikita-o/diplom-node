import { Controller, Delete, Get } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';

@Controller('manager/reservations')
export class ClientController {
  constructor(private reservationService: ReservationService) {}

  @Get(':userId')
  async listUserReservation(): Promise<Reservation> {}

  @Delete(':userId/:reservationId')
  async removeReservation(): Promise<void> {}
}
