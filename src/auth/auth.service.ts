import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { Model } from 'mongoose';
import { UtilService } from '../common/utils/util.service';
import { UserSignDto } from './dto/user-sign.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private util: UtilService,
  ) {}

  async login(data: UserSignDto): Promise<Omit<User, 'passwordHash'>> {
    const user: Partial<User> | null = await this.userModel
      .findOne({ email: data.email })
      .exec();
    if (!user || user.passwordHash !== this.util.getHash(data.password)) {
      throw new UnauthorizedException();
    }
    delete user.passwordHash;
    return user as Omit<User, 'passwordHash'>;
  }

  async register(data: RegisterDto) {
    const user: User | null = await this.userModel
      .findOne({ email: data.email })
      .exec();
    if (user) {
      throw new BadRequestException('Email!');
    }
    return this.userModel.create({
      email: data.email,
      name: data.name,
      contactPhone: data.contactPhone,
      passwordHash: this.util.getHash(data.password),
    });
  }
}
