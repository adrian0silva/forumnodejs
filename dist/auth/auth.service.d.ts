import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RedisService } from 'src/redis/redis.service';
export declare class AuthService {
    private usuarioService;
    private jwtService;
    private redisService;
    constructor(usuarioService: UsersService, jwtService: JwtService, redisService: RedisService);
    refresh(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    googleLogin(req: any): Promise<{
        access_token: string;
    }>;
}
