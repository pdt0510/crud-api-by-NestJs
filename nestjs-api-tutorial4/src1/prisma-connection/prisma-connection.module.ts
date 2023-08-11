import { Global, Module } from '@nestjs/common';
import { PrismaConnectionService } from './prisma-connection.service';

//xx13
@Global()
@Module({
  providers: [PrismaConnectionService],
  exports: [PrismaConnectionService],
})
export class PrismaConnectionModule {}
