import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Message } from './message.schema';

@Schema()
export class SupportRequest {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user!: User;

  @Prop({ required: true, default: new Date() })
  createdAt!: Date;

  // TODO: А это точно не кринж?
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages!: Message[];

  @Prop()
  isActive!: boolean;
}

export type SupportRequestDocument = SupportRequest & Document;

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
