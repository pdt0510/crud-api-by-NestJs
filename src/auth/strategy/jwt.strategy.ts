import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaConnectionService } from './../../prisma-connection/prisma-connection.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaConnectionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    try {
      const { email, sub } = payload;
      const user = await this.prisma.user.findFirst({
        where: { AND: [{ id: sub }, { email }] }, // xx5
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
}
