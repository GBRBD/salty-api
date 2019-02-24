import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { StoryDto } from '../dto/story.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Story } from '../interfaces/story.interface';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel('Story') private readonly storyModel: Model<Story>,
  ) {}

  async getStories() {
    const stories: StoryDto[] = await this.storyModel.find();
    return stories;
  }

  async getStory(id: string) {
    const story: StoryDto = await this.storyModel.findById(id);
    return story;
  }

  async createStory(storyDto: StoryDto): Promise<Story> {
    const createdStory = new this.storyModel(storyDto);
    return await createdStory.save();
  }

  async deleteStory(storyDto: StoryDto) {
    await this.storyModel.findOneAndDelete({ _id: storyDto._id });
    return { message: 'deleted' };
  }

  async editStory(storyDto: StoryDto) {
    await this.storyModel.findOneAndUpdate({ _id: storyDto._id }, storyDto);
    return await this.storyModel.findById(storyDto._id);
  }
}
