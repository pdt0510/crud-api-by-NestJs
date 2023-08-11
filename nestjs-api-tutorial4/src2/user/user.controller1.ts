import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//user.controller1.ts
@Controller('users') // 1h54ms31ss
export class UserController {
  @UseGuards(AuthGuard('jwt_Tai')) //1h57ms04ss
  @Get('me2')
  getMe() {
    return 'User info via guards class';
  }

  // 1h54ms31ss
  @Get('me')
  getMe1() {
    return 'User info';
  }
}
