import { Global, Module } from '@nestjs/common';
import { PrismaConnectionService } from './prisma-connection.service';

@Global() //45ms01ss
@Module({
  providers: [PrismaConnectionService], //43ms03ss
  exports: [PrismaConnectionService], //43ms33ss
})
export class PrismaConnectionModule {}
