import { Injectable } from '@nestjs/common';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { authDto } from './dto';
import * as argon2 from 'argon2';
import { throws } from 'assert';

//auth.service-2
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaConnectionService) {}

  signup = async (dataDto: authDto) => {
    // 1h10ms12ss
    try {
      const hashedPassword = await argon2.hash(dataDto.password);
      const createUser = await this.prisma.user.create({
        data: {
          email: dataDto.email,
          hash: hashedPassword,
        },
      });

      delete createUser.hash;
      return createUser;
    } catch (error) {
      throw new Error(`signup error --- ${error}`); //1h10ms12ss
    }
  };

  signin = async (dataDto: authDto) => {
    // 1h13ms13ss
    try {
      const { email, password } = dataDto;
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (user) {
        const isMatchPassword = await argon2.verify(user.hash, password);

        if (isMatchPassword) {
          delete user.hash;
          return user;
        }
      }

      return 'Not found!';
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  };
}
