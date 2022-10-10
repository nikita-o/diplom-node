import { Controller, Delete, Get, Post } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';

@Controller('client/reservations')
export class ClientController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  async reservationRoom(): Promise<Reservation> {}

  @Get()
  async listReservation(): Promise<Reservation[]> {}

  @Delete(':id')
  async removeReservation(): Promise<void> {}
}
