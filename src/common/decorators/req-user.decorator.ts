import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/schemas/user.schema';

export const ReqUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
  },
);
