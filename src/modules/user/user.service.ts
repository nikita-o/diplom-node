import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SearchUsersDto } from './dto/search-users.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(data: CreateUserDto): Promise<User> {
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

  findAll(params: SearchUsersDto): Promise<User[]> {
    return this.userModel
      .find({
        email: params.email,
        name: params.name,
        contactPhone: params.contactPhone,
      })
      .skip(params.offset)
      .limit(params.limit)
      .exec();
  }
}
