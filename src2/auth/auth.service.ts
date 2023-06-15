import { Injectable } from '@nestjs/common';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { authDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaConnectionService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  signup = async (dataDto: authDto) => {
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
      throw new Error(`signup error --- ${error}`);
    }
  };

  signin = async (dataDto: authDto) => {
    try {
      const { email, password } = dataDto;
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (user) {
        const isMatchPassword = await argon2.verify(user.hash, password);

        if (isMatchPassword) {
          delete user.hash;
          const accessToken = await this.signToken(user.id, user.email);
          return accessToken;
        }
      }

      return 'Not found!';
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  };

  signToken = async (
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> => {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret: secret,
    });

    return { accessToken: token };
  };
}
