import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

export const authDto: AuthDto = {
  email: 'tran72@gmail.com',
  password: 'PhanTai@123',
};

export const editUserDto: EditUserDto = {
  email: 'tran72@gmail.com', //optional
  firstName: 'Trân 2',
  lastName: 'Phạm Ngọc 2',
};

export const createBookmark: CreateBookmarkDto = {
  title: 'First bookmark',
  link: 'https://www.youtube.com/',
};

export const editBookmark: EditBookmarkDto = {
  title: 'title updated',
  description: 'Description updated', //optional
};
