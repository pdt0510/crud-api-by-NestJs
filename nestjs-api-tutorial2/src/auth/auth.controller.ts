import { Controller, Post, Req, Body, ParseIntPipe } from '@nestjs/common'; //48ms07ss
import { Request } from 'express'; //48ms07ss
import { AuthService } from './auth.service';
import { authDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup7')
  signup7(@Body() tai_dtos: authDto) {
    return this.authService.signup7(tai_dtos); // 1h01ms40ss
  }

  // 57ms40ss
  @Post('signup6')
  signup6(@Body() tai_dtos: authDto) {
    console.log('signup6 ---', tai_dtos); //1h00ms33ss
    return this.authService.signup();
  }

  // 54ms42ss
  @Post('signup5')
  signup5(
    @Body('email') email: string,
    @Body('password', ParseIntPipe) password: string,
  ) {
    console.log('email ---', typeof email);
    console.log('password ---', typeof password);
    return this.authService.signup();
  }

  // 52ms12ss
  @Post('signup4')
  signup4(@Body() tai_dtos: authDto) {
    console.log('signup4 ---', tai_dtos);
    return this.authService.signup();
  }

  // 50ms22ss
  @Post('signup3')
  signup3(@Body() tai_dtos: any) {
    console.log('typeof tai_dtos ---', typeof tai_dtos);

    if (typeof tai_dtos == 'object') {
      console.log('tai_dtos ---', tai_dtos);
      return this.authService.signup();
    }
    return { msg: 'Failed' };
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
