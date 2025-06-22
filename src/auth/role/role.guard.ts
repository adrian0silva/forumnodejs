import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles } from './roles.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Roles[]>(
      'roles',
      context.getHandler(),
    );

    if(!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authUser = request.user as User;
    if (!authUser?.role) return false;
    return authUser.role === Roles.ADMIN || requiredRoles.includes(authUser.role);
  }
}
