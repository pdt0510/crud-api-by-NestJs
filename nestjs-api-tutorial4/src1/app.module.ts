import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaConnectionModule } from './prisma-connection/prisma-connection.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //1h32ms00ss
    // ConfigModule.forRoot({}), //1h26ms46ss
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaConnectionModule,
  ],
})
export class AppModule {}
