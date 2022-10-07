import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ERole } from '../../common/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  contactPhone?: string;

  @Prop({ required: true, default: ERole.Client })
  role!: ERole;
}

export const UserSchema = SchemaFactory.createForClass(User);
