import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Hotel } from './hotel.schema';

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Hotel' })
  hotel!: Hotel;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ required: true, default: true })
  isEnabled!: boolean;
}

export type HotelRoomDocument = HotelRoom & Document;

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
