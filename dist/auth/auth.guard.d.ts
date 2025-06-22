import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private jwtService;
    private usuarioService;
    constructor(reflector: Reflector, jwtService: JwtService, usuarioService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
