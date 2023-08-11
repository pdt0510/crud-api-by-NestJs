import { AuthGuard } from '@nestjs/passport';

// 2h09ms25ss
export class jwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
