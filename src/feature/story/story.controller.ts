import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoryService } from './providers/story.service';
import { StoryDto } from './dto/story.dto';
import { AuthGuard } from 'src/core/auth.guard';

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
  @UseGuards(AuthGuard)
  async createStory(@Body() storyDto: StoryDto) {
    return this.storyService.createStory(storyDto);
  }

  @Post('delete')
  @UseGuards(AuthGuard)
  async deleteStory(@Body() storyDto: StoryDto) {
    return this.storyService.deleteStory(storyDto);
  }

  @Put('edit')
  @UseGuards(AuthGuard)
  async editStory(@Body() storyDto: StoryDto) {
    return this.storyService.editStory(storyDto);
  }
}
