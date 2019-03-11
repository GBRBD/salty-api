import { Controller, Post, Body, UseGuards, Get, Put } from '@nestjs/common';
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

  @Get('stories')
  @UseGuards(AuthGuard)
  async getUserStories() {
    return this.userService.getUserStories();
  }

  @Put('updateemail')
  @UseGuards(AuthGuard)
  async updateUserEmail(@Body() body) {
    console.log(body);
    return this.userService.updateUserEmail(body);
  }
}
