import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

//5ms32ss
@Module({
  imports: [AuthModule, UserModule, BookmarkModule], //9ms29ss, 13ms44ss
})
export class AppModule {}
