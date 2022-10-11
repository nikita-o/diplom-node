import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Reservation } from '../../database/schemas/reservation.schema';
import { ReservationService } from './reservation.service';
import { ReservationDto } from './dto/reservation.dto';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { User } from '../../database/schemas/user.schema';
import { Roles } from '../../common/decorators/roles.decorator';
import { ERole } from '../../common/enums/role.enum';
import { AuthenticatedGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reservation')
@Controller('client/reservations')
@Roles(ERole.Client)
@UseGuards(AuthenticatedGuard, RolesGuard)
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
