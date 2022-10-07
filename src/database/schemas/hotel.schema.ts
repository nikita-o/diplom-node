import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  title!: Types.ObjectId;

  @Prop()
  description?: string;
}

export type HotelDocument = Hotel & Document;

export const HotelSchema = SchemaFactory.createForClass(Hotel);
