import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaConnectionModule } from './prisma-connection/prisma-connection.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //1h26ms46ss
    ConfigModule.forRoot({
      isGlobal: true, //1h32ms00ss
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaConnectionModule,
  ],
})
export class AppModule {}
