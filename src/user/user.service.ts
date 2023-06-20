import { Injectable } from '@nestjs/common';
import { PrismaConnectionService } from '../prisma-connection/prisma-connection.service';
import { EditUserDto } from './dto';

// 3h04ms38ss
@Injectable()
export class UserService {
  constructor(private prisma: PrismaConnectionService) {}

  editUser = async (userId: number, dto: EditUserDto) => {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { ...dto },
      });

      if (user) {
        delete user.hash;
        return user;
      }

      return { meg: 'Not found!' };
    } catch (error) {
      throw new Error(`editUser error --- ${error}`);
    }
  };
}
