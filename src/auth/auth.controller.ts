//14ms53ss
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//ctrl file, 21ms19ss
@Controller('auth')
export class AuthController {
  // 17ms01ss
  constructor(private authService: AuthService) {
    this.authService.test(); // 19ms27ss
  }

  //20ms07ss
  @Post('signup')
  signup() {
    return 'I signed-up';
  }

  @Post('signin')
  signin() {
    return 'I signed-in';
  }

  // 23ms17ss
  @Post('signup2')
  signup2() {
    return { mes: 123 };
  }

  // 23ms55ss
  @Post('signup3')
  signup3() {
    console.log('this 1---', this);

    return this.authService.signup3();
  }

  @Post('signin3')
  signin3() {
    return this.authService.signin3();
  }
}
