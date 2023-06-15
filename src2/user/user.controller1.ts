import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

//user.controller1.ts
@Controller('users') // 1h54ms31ss
export class UserController {
  /* 1h57ms04ss */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe() {
    return 'user info';
  }

  /*users/me,  1h54ms31ss*/
  // @Get('me')
  // getMe() {
  //   return 'user info';
  // }
}
