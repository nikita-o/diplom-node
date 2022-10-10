import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { Model } from 'mongoose';
import { UtilService } from '../common/utils/util.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private util: UtilService,
  ) {}

  async register(data: RegisterDto | any) {
    const user: User | null = await this.userModel
      .findOne({ email: data.email })
      .exec();
    if (user) {
      throw new BadRequestException('Email!');
    }
    data.passwordHash = this.util.getHash(data.password);
    delete data.password;
    return this.userModel.create({ data });
  }
}
