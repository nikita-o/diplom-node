import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ERole } from '../enums/role.enum';

export const Roles = (...roles: ERole[]): CustomDecorator =>
  SetMetadata('roles', roles);
