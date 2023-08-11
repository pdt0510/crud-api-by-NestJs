import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//41ms09ss
@Injectable()
export class PrismaConnectionService extends PrismaClient {
  // 41ms30ss
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
        },
      },
    });
  }
}
