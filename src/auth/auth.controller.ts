import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dtos: AuthDto) {
    return this.authService.signup(dtos);
  }

  @Post('signin')
  signin(@Body() dtos: AuthDto) {
    return this.authService.signin(dtos);
  }
}
