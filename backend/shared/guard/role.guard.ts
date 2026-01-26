import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '@prisma/client';
import { ITokenPayload } from 'shared/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RoleType[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context
      .switchToHttp()
      .getRequest<{ user: ITokenPayload }>();
    return requiredRoles.includes(user.role);
  }
}
