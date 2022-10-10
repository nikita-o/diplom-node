import { PartialType } from '@nestjs/swagger';
import { AddHotelDto } from './add-hotel.dto';

export class UpdateHotelDto extends PartialType(AddHotelDto) {}
