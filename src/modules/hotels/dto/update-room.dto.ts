import { PartialType } from '@nestjs/swagger';
import { AddRoomDto } from './add-room.dto';

export class UpdateRoomDto extends PartialType(AddRoomDto) {
  isEnabled?: boolean;
}
