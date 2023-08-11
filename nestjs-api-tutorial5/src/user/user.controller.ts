import { Controller, Get, Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Request } from 'express';
import { jwtGuard } from './../auth/guard/jwt.guard';
import {
  checkDTO,
  getUser,
  getUser2,
} from '../auth/decorator/get-user.decorator';

@UseGuards(jwtGuard) //2h16ms48ss
@Controller('users')
export class UserController {
  // xx14
  @Patch('edit/:id')
  async editUser(@checkDTO('id') id: number, @checkDTO('email') email: string) {
    if (id && email) {
      console.log('id && email ---', id && email);
      return 'Patched';
    }
    return 'Patch Failed';
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
  async getMe(@getUser('') user: Request) {
    try {
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}
