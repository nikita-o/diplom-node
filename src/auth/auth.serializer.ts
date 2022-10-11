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
    process.nextTick(() => {
      console.log(666);
      return done(null, user.id);
    });
  }

  deserializeUser(id: string, done: Function): any {
    console.log(123);
    this.userModel
      .findById(id)
      .select(['-passwordHash'])
      .exec()
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
