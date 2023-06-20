import { Injectable, Patch } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaConnectionService } from './../prisma-connection/prisma-connection.service';

// 3h12ms22ss, 3h20ms43ss
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaConnectionService) {}

  getBookmarks = async (userId: number) => {
    try {
      const records = await this.prisma.bookmark.findMany({
        where: { id: userId },
      });

      return records;
    } catch (error) {
      throw new Error(`getBookmarks error --- ${error}`);
    }
  };

  createBookmark = async (userId: number, dto: CreateBookmarkDto) => {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: { userId, ...dto },
      });

      return { bookmarkCreated: bookmark };
    } catch (error) {
      throw new Error(`createBookmark error --- ${error}`);
    }
  };

  getBookmarkById = async (userId: number, bookmarkId: number) => {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: {
          userId,
          id: bookmarkId,
        },
      });

      if (bookmark) {
        return { bookmarkListById: bookmark }; //xx9
      }

      return [];
    } catch (error) {
      throw new Error(`getBookmarkById error --- ${error}`);
    }
  };

  getBookmarkById2 = async (userId: number, bookmarkId: number) => {}; //xx10

  editBookmarkById = async (
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) => {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { userId, id: bookmarkId }, //xx5
      });

      if (bookmark && bookmark.userId === userId) {
        const newUpdate = await this.prisma.bookmark.update({
          where: { id: bookmarkId }, //xx5, thêm userId to 'where' sẽ lỗi dù có userId col in table
          data: { ...dto },
        });

        return { bookmarkUpdated: newUpdate };
      }

      return 'Bookmark isn`t updated!'; //xx9
    } catch (error) {
      throw new Error(`editBookmarkById error --- ${error}`);
    }
  };

  delBookmarkById = async (userId: number, bookmarkId: number) => {
    try {
      const bookmark = await this.prisma.bookmark.findFirst({
        where: { userId, id: bookmarkId },
      });

      if (bookmark && bookmark.userId === userId) {
        const result = await this.prisma.bookmark.delete({
          where: { id: bookmarkId },
        });

        return { bookmarkDeleted: result };
      }

      return 'Not deleted!'; //xx9
    } catch (error) {
      throw new Error(`delBookmarkById error --- ${error}`);
    }
  };
}
