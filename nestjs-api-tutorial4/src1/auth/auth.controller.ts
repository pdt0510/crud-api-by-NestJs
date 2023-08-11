import { Controller, Post, Req, Body, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { authDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dtos: authDto) {
    return this.authService.signup(dtos);
  }

  @Post('signin')
  signin(@Body() dtos: authDto) {
    return this.authService.signin(dtos);
  }
}
