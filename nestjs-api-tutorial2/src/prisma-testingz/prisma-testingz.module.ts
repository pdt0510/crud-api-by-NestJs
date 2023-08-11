import { Module } from '@nestjs/common';
import { PrismaTestingzService } from './prisma-testingz.service';

@Module({
  providers: [PrismaTestingzService]
})
export class PrismaTestingzModule {}
