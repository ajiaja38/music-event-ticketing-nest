import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IJwtPayload } from 'src/app/auth/interface/jwtPayload.interface';
import { ERole } from 'src/utils/enum/ERole.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: ERole[] = this.reflector.get<ERole[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles)
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );

    const request = context.switchToHttp().getRequest();
    const user: IJwtPayload = request.user;

    if (!this.matchRoles(roles, user.role)) {
      throw new ForbiddenException(
        'Your role do not have permission to access this resource',
      );
    }

    return this.matchRoles(roles, user.role);
  }

  private matchRoles(allowedRoles: ERole[], userRole: ERole) {
    return allowedRoles.includes(userRole);
  }
}
