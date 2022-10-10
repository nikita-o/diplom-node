import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User, UserDocument } from '../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  serializeUser(user: UserDocument, done: Function): any {
    process.nextTick(() => done(null, user.id));
  }

  deserializeUser(id: string, done: Function): any {
    this.userModel
      .findById(id)
      .exec()
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
