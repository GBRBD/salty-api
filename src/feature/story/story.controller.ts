import { Controller, Post, Body, Get } from '@nestjs/common';
import { StoryService } from './providers/story.service';
import { StoryDto } from './dto/story.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post('add')
  async addStory(@Body() storyDto: StoryDto) {
    return this.storyService.addStory(storyDto);
  }

  @Get()
  async getStories() {
    return this.storyService.getStories();
  }
}
