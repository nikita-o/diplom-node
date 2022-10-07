import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document, Types } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author!: User;

  @Prop({ required: true, default: new Date() })
  sentAt!: Date;

  @Prop({ required: true })
  text!: string;

  @Prop()
  readAt!: Date;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
