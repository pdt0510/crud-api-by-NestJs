import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaConnectionService extends PrismaClient {
  // 1h30ms54ss
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
          // url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
        },
      },
    });

    console.log('config ---', config.get('DATABASE_URL'));
  }
}
