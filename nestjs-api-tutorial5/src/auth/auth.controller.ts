import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.CREATED) //2h19ms42ss
  @Post('signup')
  signup(@Body() dtos: authDto) {
    return this.authService.signup(dtos);
  }

  @Post('signin')
  signin(@Body() dtos: authDto) {
    return this.authService.signin(dtos);
  }
}
