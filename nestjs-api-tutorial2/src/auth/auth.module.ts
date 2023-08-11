import { Module } from '@nestjs/common';
import { PrismaConnectionModule } from 'src/prisma-connection/prisma-connection.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // imports: [PrismaConnectionModule], //43ms03ss, 43ms33ss, 45ms01ss
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
