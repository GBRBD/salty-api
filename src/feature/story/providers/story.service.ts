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
    const stories = await this.storyModel.find().sort({ date: -1 });
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
    createdStory.username = user.username;
    createdStory.uid = user.uid;

    return await createdStory.save();
  }

  async deleteStory(id: string) {
    const token = this.firebaseService.firebaseUserId;
    const story = await this.storyModel.findOne({ _id: id });

    if (token === story.uid) {
      await this.storyModel.findOneAndDelete({ _id: id });
      return { message: 'deleted' };
    } else {
      throw new UnauthorizedException();
    }
  }

  async editStory(storyDto: StoryDto) {
    const token = this.firebaseService.firebaseUserId;

    if (token === storyDto.uid) {
      await this.storyModel.findOneAndUpdate({ _id: storyDto._id }, storyDto);
      return await this.storyModel.findById(storyDto._id);
    } else {
      throw new UnauthorizedException();
    }
  }

  async commentStory(id, body) {
    const token = this.firebaseService.firebaseUserId;

    const comment = {
      commentUid: token,
      comment: body.comment,
      username: body.username,
      date: Date.now(),
    };
    await this.storyModel.findByIdAndUpdate(id, {
      $push: { comments: comment },
    });

    return { message: 'successs' };
  }
}
