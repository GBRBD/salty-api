import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/core/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createStory(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }
}
