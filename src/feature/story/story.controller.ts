import { Controller, Post, Body } from '@nestjs/common';
import { StoryService } from './providers/story.service';
import { async } from 'rxjs/internal/scheduler/async';
import { StoryDto } from './dto/story.dto';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  async create(@Body() storyDto: StoryDto) {
    return this.storyService.create(storyDto);
  }
}
