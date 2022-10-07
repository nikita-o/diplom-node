import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HotelDocument = Hotel & Document;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true })
  title!: Types.ObjectId;

  @Prop()
  description?: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
