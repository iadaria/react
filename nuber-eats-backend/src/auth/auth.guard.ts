import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowedRoles } from './role.decorator';
import { Role } from 'src/auth/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly relfector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.relfector.get<AllowedRoles>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }

    return roles.includes(user.role);
  }
}
