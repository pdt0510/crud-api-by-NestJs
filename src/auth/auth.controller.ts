import { Controller, Post, Req, Body, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express'; //48ms07ss
import { AuthService } from './auth.service';
import { authDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1h01ms40ss
  @Post('signup6')
  signup6(@Body() tai_dtos: authDto) {
    return this.authService.signup_2(tai_dtos);
  }

  @Post('signup5')
  signup5(
    @Body('email') email: string,
    @Body('password', ParseIntPipe) password: string, // 54ms42ss
  ) {
    console.log('email ---', typeof email);
    console.log('password ---', typeof password);
    return this.authService.signup();
  }

  @Post('signup4')
  signup4(@Body() tai_dtos: authDto) {
    const { email, password } = tai_dtos; // 52ms12ss
    console.log('tai_dtos ---', tai_dtos);
    return this.authService.signup();
  }

  // 50ms22ss
  @Post('signup3')
  signup3(@Body() tai_dtos: any) {
    console.log('tai_dtos ---', tai_dtos);
    return this.authService.signup();
  }

  /* 48ms07ss*/
  @Post('signup2')
  signup2(@Req() req: Request) {
    const data = req.body;
    console.log('data ---', data);
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
