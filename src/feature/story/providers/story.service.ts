import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FirebaseService } from 'src/firebase/firebase.service';

import { StoryDto } from '../dto/story.dto';
import { Story } from '../interfaces/story.interface';
import { User } from '../../user/interfaces/user.interface';

@Injectable()
export class StoryService {
  constructor(
    private firebaseService: FirebaseService,
    @InjectModel('Story') private readonly storyModel: Model<Story>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getStories() {
    const stories = await this.storyModel.find();
    return stories;
  }

  async getStory(id: string) {
    const story = await this.storyModel.findById(id);
    return story;
  }

  async createStory(storyDto: StoryDto): Promise<Story> {
    const createdStory = new this.storyModel(storyDto);
    const token = this.firebaseService.firebaseUserId;

    const user = await this.userModel.findOne({ uid: token });
    console.log(user);
    createdStory.username = user.username;
    createdStory.uid = user.uid;

    // console.log(this.firebaseService.firebaseUserId);
    return await createdStory.save();
  }

  async deleteStory(storyDto: StoryDto) {
    await this.storyModel.findOneAndDelete({ _id: storyDto._id });
    return { message: 'deleted' };
  }

  async editStory(storyDto: StoryDto) {
    const token = this.firebaseService.firebaseUserId;
    console.log('uid headerbol', token);
    console.log('post uid', storyDto.uid);

    if (token === storyDto.uid) {
      await this.storyModel.findOneAndUpdate({ _id: storyDto._id }, storyDto);
      return await this.storyModel.findById(storyDto._id);
    } else {
      console.log('Denied');
      throw new UnauthorizedException();
    }
  }
}
