import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema()
export class RefreshToken {
  @Prop()
  token!: string;

  @Prop()
  expDate!: Date;

  @Prop()
  genDate!: Date;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user!: User;
}

export type RefreshTokenDocument = RefreshToken & Document;

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
