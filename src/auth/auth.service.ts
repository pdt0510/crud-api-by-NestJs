import { Injectable } from '@nestjs/common';
import { PrismaClient, User, Bookmark } from '@prisma/client'; // 38ms14ss
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { authDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaConnectionService) {} // 42ms11ss

  // 1h01ms40ss
  signup_2 = async (dataDto: authDto) => {
    try {
      const { email, password } = dataDto;
      const hashedPassword = await argon2.hash(password);

      const createUser = await this.prisma.user.create({
        data: {
          email: email,
          hash: hashedPassword,
        },
      });
      /*
      CRUD to real db; shape dto; transformer/validator class; whitelist api, hashed by argon package, 

      
      */

      return createUser;
    } catch (err) {
      console.log('signup_2 err ---', err);
    }
  };

  signup = () => {
    return { msg: 'I have sign-up' };
  };

  signin = () => {
    return { msg: 'I have sign-in' };
  };
}
