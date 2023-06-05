//14ms53ss
import { Injectable } from '@nestjs/common';

@Injectable({}) //serv file
export class AuthService {
  // 19ms27ss
  test() {
    console.log('test ---');
  }

  // 23ms55ss
  signup3 = () => {
    return { msg: 'I have sign-up 3' };
  };

  signin3 = () => {
    return { msg: 'I have sign-in 3' };
  };
}
