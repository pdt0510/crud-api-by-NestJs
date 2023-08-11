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

  @UseGuards(AuthGuard('jwt_Tai'))
  @Get('me3')
  async getMe(@Req() req: Request) {
    //2h06ms35ss
    try {
      const user = req.user;
      console.log('req.user ---', user); //2h04ms03ss
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}
