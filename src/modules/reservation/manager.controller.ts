import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { User } from '../../database/schemas/user.schema';
import { Roles } from '../../common/decorators/roles.decorator';
import { ERole } from '../../common/enums/role.enum';
import { AuthenticatedGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reservation')
@Controller('manager/reservations')
@Roles(ERole.Manager)
@UseGuards(AuthenticatedGuard, RolesGuard)
export class ManagerController {
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
