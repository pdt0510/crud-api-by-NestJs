import { Controller, Get, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; //2h04ms03ss
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';

//user.controller2.ts
@Controller('users')
export class UserController {
  constructor(
    private prisma: PrismaConnectionService,
    private config: ConfigService,
  ) {}

  // 2h06ms35ss
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: Request) {
    try {
      const user = req.user;
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getMe(@Req() req: Request) {
  //   console.log('req.user ---', req.user); //from validate's payload, 2h04ms03ss
  //   return 'user info';
  // }
}
