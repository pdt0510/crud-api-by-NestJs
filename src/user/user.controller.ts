import { Controller, Get, Patch } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Request } from 'express';
import { jwtGuard } from './../auth/guard/jwt.guard';
import { getUser } from '../auth/decorator/get-user.decorator';

@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  async getMe(@getUser() user: Request) {
    try {
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}
