import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaConnectionService } from '../../prisma-connection/prisma-connection.service';

//jwt.strategy1.ts, 1h53ms01ss,
@Injectable()
// 1h57ms04ss
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt_Tai') {
  constructor(config: ConfigService, private prisma: PrismaConnectionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //2h00ms35ss
      secretOrKey: config.get('JWT_SECRET'), // xx4, 2h00ms35ss
    });
  }

  //2h01ms01ss
  async validate(payload: any) {
    if (payload) {
      console.log('IsValid ---', payload);
      return payload;
    }
    return false;
  }
}
