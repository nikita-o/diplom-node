import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UtilService } from '../../common/utils/util.service';
import { IUserService } from './interfaces/user-service.interface';
import { ISearchUserParams } from './interfaces/search-user-params.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private util: UtilService,
  ) {}

  create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async findById(id: string): Promise<User> {
    const user: User | null = await this.userModel.findById(id).exec();
    if (!user) {
      throw new BadRequestException('No user');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User | null = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new BadRequestException('No user');
    }
    return user;
  }

  findAll(params: ISearchUserParams): Promise<User[]> {
    const searchParams: FilterQuery<User> = {};
    if (params.name) {
      searchParams.name = params.name;
    }
    if (params.email) {
      searchParams.email = params.email;
    }
    if (params.contactPhone) {
      searchParams.contactPhone = params.contactPhone;
    }

    return this.userModel
      .find(searchParams)
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }
}
