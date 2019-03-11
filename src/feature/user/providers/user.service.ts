import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Story } from '../../story/interfaces/story.interface';
@Injectable()
export class UserService {
  constructor(
    private firebaseService: FirebaseService,
    @InjectModel('Story') private readonly storyModel: Model<Story>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }

  async getUserStories() {
    const token = this.firebaseService.firebaseUserId;
    const stories = await this.storyModel
      .find({ uid: token })
      .sort({ date: -1 });
    return stories;
  }
}
