import { CreateBookmarkDto, EditBookmarkDto } from '../src/bookmark/dto';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';

export const authDto: AuthDto = {
  email: 'phantai001@gmail.com',
  password: 'PhanTai@123',
};

export const editUserDto: EditUserDto = {
  email: 'phantai001@gmail.com', //optional
  firstName: 'Tai',
  lastName: 'Phan',
};

export const createBookmark: CreateBookmarkDto = {
  title: 'First bookmark',
  link: 'https://www.youtube.com/',
};

export const editBookmark: EditBookmarkDto = {
  title: 'Bookmark title updated',
  description: 'Description updated', //optional
};
