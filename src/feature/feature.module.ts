import { Module } from '@nestjs/common';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StoryModule, UserModule],
})
export class FeatureModule {}
