import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller('client/reservations')
export class ClientController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  async reservationRoom(@Body() data: ReservationDto): Promise<Reservation> {
    return await this.reservationService.addReservation({
      room: data.hotelRoom,
      dateStart: data.startDate,
      dateEnd: data.endDate,
    });
  }

  @Get()
  async listReservation(): Promise<Reservation[]> {}

  @Delete(':id')
  async removeReservation(): Promise<void> {}
}
