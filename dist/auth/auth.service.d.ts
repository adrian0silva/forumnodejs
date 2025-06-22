import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usuarioService;
    private jwtService;
    constructor(usuarioService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    googleLogin(req: any): Promise<{
        access_token: string;
    }>;
}
