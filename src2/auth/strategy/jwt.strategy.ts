import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaConnectionService } from './../../prisma-connection/prisma-connection.service';

@Injectable() // 1h53ms01ss
//1h57ms04ss
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaConnectionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //2h00ms35ss
      secretOrKey: config.get('JWT_SECRET'), // xx4
    });
  }
  // 2h06ms35ss
  async validate(payload: { sub: number; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (user) {
        delete user.hash;
        return user;
      }

      return null;
    } catch (error) {
      throw new Error(`validate error --- ${error}`);
    }
  }

  async validate2(payload: any) {
    // return 'hello';
    // return null;
    return payload; // 2h04ms03ss
  }

  /* 2h00ms35ss */
  async validate1(payload: any) {
    console.log('payload -----', payload);
  }
}
