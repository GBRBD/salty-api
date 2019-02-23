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
}
