import {
  Controller,
  UseGuards,
  Get,
  Patch,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { jwtGuard } from '../auth/guard';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { GetUser } from '../user/decorator';
import { BookmarkService } from './bookmark.service';

// 3h12ms22ss, 3h20ms43ss
@UseGuards(jwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkSer: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkSer.getBookmarks(userId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkSer.createBookmark(userId, dto);
  }

  @Get() //xx10
  getBookmarkById2(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkSer.getBookmarkById2(userId, bookmarkId); //xx10
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number, // 3h16ms25ss
  ) {
    return this.bookmarkSer.getBookmarkById(userId, bookmarkId);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @GetUser('id') bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkSer.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  delBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkSer.delBookmarkById(userId, bookmarkId);
  }
}
