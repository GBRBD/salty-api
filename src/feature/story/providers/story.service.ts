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

  async create(storyDto: StoryDto): Promise<Story> {
    const createdStory = new this.storyModel(storyDto);
    return await createdStory.save();
  }
}
