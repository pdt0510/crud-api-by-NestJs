import { Injectable, Global } from '@nestjs/common';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { authDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface rule {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaConnectionService,
    private jwt: JwtService, // 1h40ms38ss
    private config: ConfigService, //1h45ms10ss
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

      // xx1
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (user) {
        const isMatchPassword = await argon2.verify(user.hash, password);

        if (isMatchPassword) {
          return this.signToken(user.id, user.email); //1h45ms10ss
        }
      }

      return 'Not found!';
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  };

  signin1 = (dataDto: authDto) => {
    try {
      const { email } = dataDto;
      const jwt = this.signToken(1, email); //1h46ms35ss
      return jwt;
    } catch (error) {
      throw new Error(`signin error --- ${error}`);
    }
  };

  // 1h47ms53ss
  signToken = async (
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> => {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: userId,
      email,
    };

    // xx1
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { accessToken: token };
  };

  // 1h42ms06ss
  signToken1 = (userId: number, email: string): Promise<string> => {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET'); //1h45ms10ss

    // 1h46ms35ss
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
  };
}
