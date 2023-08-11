import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaConnectionService } from '../../prisma-connection/prisma-connection.service';

// xx13
interface keysDefaulted {
	sub: number;
	email: string;
}

//jwt.strategy2.ts, 1h53ms01ss,
@Injectable()
// 1h57ms04ss
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt_Tai') {
	constructor(config: ConfigService, private prisma: PrismaConnectionService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //2h00ms35ss
			secretOrKey: config.get('JWT_SECRET'), // xx4, 2h00ms35ss
		});
	}

	// xx13
	async validate333(payload: keysDefaulted) {
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

	async validate1(payload: any) {
		return payload; //2h04ms03ss
	}
}
