import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './providers/story.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from './schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
  ],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
