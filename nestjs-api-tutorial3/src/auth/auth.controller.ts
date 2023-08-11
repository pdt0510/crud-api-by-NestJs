import { Controller, Post, Body } from '@nestjs/common';
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
    return this.authService.signin(dtos); // 1h13ms13ss
  }
}
