import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { Model } from 'mongoose';
import { UtilService } from '../../common/utils/util.service';
import { faker } from '@faker-js/faker';
import { ERole } from '../../common/enums/role.enum';
import { Hotel, HotelDocument } from '../../database/schemas/hotel.schema';
import {
  HotelRoom,
  HotelRoomDocument,
} from '../../database/schemas/hotel-room.schema';
import {
  Reservation,
  ReservationDocument,
} from '../../database/schemas/reservation.schema';
import {
  Message,
  MessageDocument,
} from '../../database/schemas/message.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from '../../database/schemas/support-request.schema';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoomDocument>,
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(SupportRequest.name)
    private supportRequestModel: Model<SupportRequestDocument>,
    private util: UtilService,
  ) {}

  async seeding(): Promise<void> {
    const client1: User = await this.userModel.create({
      name: 'Client',
      email: 'client@mail.com',
      passwordHash: this.util.getHash('1234'),
      contactPhone: faker.phone.number(),
      role: ERole.Client,
    });
    const admin1: User = await this.userModel.create({
      name: 'Admin',
      email: 'admin@mail.com',
      passwordHash: this.util.getHash('1234'),
      contactPhone: faker.phone.number(),
      role: ERole.Admin,
    });
    const manager1: User = await this.userModel.create({
      name: 'Manager',
      email: 'manager@mail.com',
      passwordHash: this.util.getHash('1234'),
      contactPhone: faker.phone.number(),
      role: ERole.Manager,
    });

    const h1: Hotel = await this.hotelModel.create({
      title: 'hotel_1',
      description: faker.lorem.text(),
    });
    const h2: Hotel = await this.hotelModel.create({
      title: 'hotel_2',
      description: faker.lorem.text(),
    });

    const r11: HotelRoom = await this.hotelRoomModel.create({
      hotel: h1,
      description: faker.lorem.text(),
    });
    const r12: HotelRoom = await this.hotelRoomModel.create({
      hotel: h1,
      description: faker.lorem.text(),
    });
    const r13: HotelRoom = await this.hotelRoomModel.create({
      hotel: h1,
      description: faker.lorem.text(),
    });

    await this.reservationModel.create({
      user: client1,
      hotel: h1,
      room: r11,
      dateStart: faker.date.past(2022),
      dateEnd: faker.date.future(2022),
    });

    const messageC1: Message = await this.messageModel.create({
      author: client1,
      text: faker.lorem.text(),
    });
    const messageC2: Message = await this.messageModel.create({
      author: client1,
      text: faker.lorem.text(),
    });
    const messageM1: Message = await this.messageModel.create({
      author: manager1,
      text: faker.lorem.text(),
    });
    const messageM2: Message = await this.messageModel.create({
      author: manager1,
      text: faker.lorem.text(),
    });

    await this.supportRequestModel.create({
      user: client1,
      messages: [messageC1, messageM1, messageC2, messageM2],
      isActive: true,
    });
  }

  async clearDB(): Promise<void> {
    await this.userModel.remove();
    await this.hotelModel.remove();
    await this.hotelRoomModel.remove();
    await this.reservationModel.remove();
    await this.messageModel.remove();
    await this.supportRequestModel.remove();
  }
}
