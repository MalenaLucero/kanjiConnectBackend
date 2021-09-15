import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector,
              @Inject(config.KEY) private configService: ConfigType<typeof config>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    } else {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.header('Authorization');
      const isAuth = authHeader === this.configService.mongo.apiKey;
      if (!isAuth) {
        throw new UnauthorizedException('Forbidden')
      }
      return isAuth;
    }
    
  }
}
