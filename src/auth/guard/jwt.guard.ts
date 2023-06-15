// 2h09ms25ss
import { AuthGuard } from '@nestjs/passport';

export class jwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
