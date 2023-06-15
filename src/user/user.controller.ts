import { Controller, Get, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { jwtGuard } from './../auth/guard/jwt.guard';

@Controller('users')
export class UserController {
  @UseGuards(jwtGuard) // 2h09ms25ss
  @Get('me')
  async getMe(@Req() req: Request) {
    try {
      const user = req.user;
      return user;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  }
}

/*
passport-jwt (accessToken, return types of async-await/promise, @Injectable, custom jwtGuards); NestJs configmodule; super; Guards; validate's payload; 

*/
