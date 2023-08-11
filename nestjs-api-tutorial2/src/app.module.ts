import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaConnectionModule } from './prisma-connection/prisma-connection.module';
import { PrismaTestingzModule } from './prisma-testingz/prisma-testingz.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaConnectionModule, PrismaTestingzModule],
})
export class AppModule {}
