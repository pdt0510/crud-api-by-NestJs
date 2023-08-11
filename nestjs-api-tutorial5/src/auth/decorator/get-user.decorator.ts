import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { isNumber } from 'class-validator';

// xx14
export const checkDTO = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data === 'email') {
      if (user?.[data].includes('@')) {
        return data ? user?.[data] : user;
      }
    } else if (data === 'id') {
      if (isNumber(user?.[data])) {
        return data ? user?.[data] : user;
      }
    }
    return {};
  },
);

export const getUser2 = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log('data 2 ---', data);
    return data ? user?.[data] : user; // 2h17ms37ss
  },
);

// 2h12ms15ss
export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('data ---', data);
    const request: Express.Request = ctx.switchToHttp().getRequest(); // 2h15ms05ss
    // const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
