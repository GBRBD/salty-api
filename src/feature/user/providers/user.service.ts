import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }
}
