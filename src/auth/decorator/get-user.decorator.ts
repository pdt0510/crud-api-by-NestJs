import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 2h17ms37ss
export const getUser2 = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log('data ---', data, typeof data);
    return data ? user?.[data] : user;
  },
);

// 2h12ms15ss
export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest(); // 2h15ms05ss
    // const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
