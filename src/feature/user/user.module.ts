import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from '../story/schemas/story.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Story', schema: StorySchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
