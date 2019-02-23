import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { StoryService } from './providers/story.service';
import { StoryDto } from './dto/story.dto';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get()
  async getStories() {
    return this.storyService.getStories();
  }

  @Get(':id')
  async getStory(@Param('id') id) {
    return this.storyService.getStory(id);
  }

  @Post('create')
  async createStory(@Body() storyDto: StoryDto) {
    return this.storyService.createStory(storyDto);
  }
}
