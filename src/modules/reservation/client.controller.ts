import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { User } from '../../database/schemas/user.schema';

@Controller('client/reservations')
export class ClientController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  async reservationRoom(
    @Body() data: ReservationDto,
    @ReqUser() user: User,
  ): Promise<Reservation> {
    return await this.reservationService.addReservation(data, user);
  }

  @Get()
  async listReservation(@ReqUser() user: User): Promise<Reservation[]> {
    return this.reservationService.getUserReservations(user);
  }

  @Delete(':id')
  async removeReservation(@Param('id') id: string): Promise<void> {
    await this.reservationService.removeReservation(id);
  }
}
