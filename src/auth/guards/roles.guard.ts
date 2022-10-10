import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../../common/enums/role.enum';
import { User } from '../../database/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: ERole[] = this.reflector.getAllAndOverride<ERole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const user: User = context.switchToHttp().getRequest().user;
    return requiredRoles.includes(user.role);
  }
}
