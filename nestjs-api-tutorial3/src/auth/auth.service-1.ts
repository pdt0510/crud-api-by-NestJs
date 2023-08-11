import { Injectable } from '@nestjs/common';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { authDto } from './dto';
import * as argon2 from 'argon2';

//auth.service-1
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaConnectionService) {}

  signup = async (dataDto: authDto) => {
    const { email, password } = dataDto;
    const hashedPassword = await argon2.hash(password);

    // 1h09ms02ss
    const createUser = await this.prisma.user.create({
      data: {
        email: email,
        hash: hashedPassword,
      },
      // select: {
      //   id: true, // 1h05ms02ss
      //   email: true,
      //   createdAt: true,
      // },
    });

    delete createUser.hash; // 1h05ms40ss

    return createUser;
  };

  signin = () => {
    return { msg: 'I have sign-in' };
  };
}
