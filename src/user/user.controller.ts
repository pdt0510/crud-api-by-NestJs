import { Controller, Get, Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Request } from 'express';
import { jwtGuard } from './../auth/guard/jwt.guard';
import { getUser, getUser2 } from '../auth/decorator/get-user.decorator';

@UseGuards(jwtGuard) //2h16ms48ss
@Controller('users')
export class UserController {
  // 2h17ms12ss
  @Patch('edit')
  async editUser(@getUser() user: Request) {
    return 'edit user';
  }

  // 2h17ms37ss
  @Get('me2')
  async getMe2(@getUser2('id') id: number, @getUser2('email') email: string) {
    try {
      return { id, email };
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }

  // 2h12ms15ss
  @Get('me')
  async getMe(@getUser() user: Request) {
    try {
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}
