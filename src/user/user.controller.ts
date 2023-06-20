import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { jwtGuard } from './../auth/guard/jwt.guard';
import { GetUser } from './decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// 3h04ms38ss
@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  async editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    try {
      return this.userService.editUser(userId, dto);
    } catch (error) {
      throw new Error(`editUser error --- ${error}`);
    }
  }

  @Get('me')
  async getMe(@GetUser() user: Request) {
    try {
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}
