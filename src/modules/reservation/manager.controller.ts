import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { User } from '../../database/schemas/user.schema';

@Controller('manager/reservations')
export class ClientController {
  constructor(private reservationService: ReservationService) {}

  @Get(':userId')
  async listUserReservation(
    @Param('userId') userId: string,
  ): Promise<Reservation[]> {
    return this.reservationService.getUserReservations(
      userId as unknown as User,
    );
  }

  @Delete(':userId/:reservationId')
  async removeReservation(
    @Param('userId') userId: string,
    @Param('reservationId') reservationId: string,
  ): Promise<void> {
    await this.reservationService.removeReservationUser(userId, reservationId);
  }
}
