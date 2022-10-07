import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Hotel } from './hotel.schema';
import { HotelRoom } from './hotel-room.schema';

@Schema()
export class Reservation {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user!: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Hotel' })
  hotel!: Hotel;

  @Prop({ required: true, type: Types.ObjectId, ref: 'HotelRoom' })
  room!: HotelRoom;

  @Prop({ required: true })
  dateStart!: Date;

  @Prop({ required: true })
  dateEnd!: Date;
}

export type ReservationDocument = Reservation & Document;

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
