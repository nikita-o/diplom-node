import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { User, UserDocument } from '../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from '../common/utils/util.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private util: UtilService,
  ) {
    super({ usernameField: 'email', passwordField: 'password', session: true });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    const user: Partial<User> | null = await this.userModel
      .findOne({ email })
      .exec();
    if (!user || user.passwordHash !== this.util.getHash(password)) {
      throw new UnauthorizedException();
    }
    delete user.passwordHash;
    return user as Omit<User, 'passwordHash'>;
  }
}
