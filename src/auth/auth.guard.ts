import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,private usuarioService: UsersService
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    console.log('AuthGuard: Verificando rota');
    console.log('AuthGuard: Handler:', context.getHandler().name);
    console.log('AuthGuard: Class:', context.getClass().name);
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(this.reflector)
    
    console.log('AuthGuard: isPublic =', isPublic);
    //console.log('AuthGuard: Metadata keys =', this.reflector.getMetadataKeys(context.getHandler()));
    
    if (isPublic) {
      console.log('AuthGuard: Rota é pública, permitindo acesso');
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if(!token) {
      console.log('AuthGuard: Token não fornecido');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verify<{
        name: string,
        email: string,
        role: Roles,
        sub: number
      }>(token, {algorithms: ['HS256']});
      
      console.log('AuthGuard: Token válido, buscando usuário');
      
      const user = await this.usuarioService.findOne({
        where: {
          id: payload.sub
        }
      });
      
      if(!user) {
        console.log('AuthGuard: Usuário não encontrado');
        throw new UnauthorizedException('User not found');
      }
      
      console.log('AuthGuard: Usuário encontrado, permitindo acesso');
      request.user = user;
      return true;
    } catch (error) {
      console.log('AuthGuard: Erro ao verificar token:', error);
      if( error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired', {cause: error});
      }
      throw new UnauthorizedException('Invalid token', {cause: error});
    }
  }
}
