import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Юзер вернется без диссерелизации! Вместе с хешем пароля!
@Injectable()
export class LocalLoginGuard extends AuthGuard('local') implements CanActivate {
  public override async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const result = <boolean>await super.canActivate(context);
    const request: any = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);

    return result;
  }
}
