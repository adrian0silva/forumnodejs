import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { Roles } from './role/roles.enum';

@Injectable()
export class AuthService {

    constructor(private usuarioService: UsersService,private jwtService: JwtService) {}

    async login(loginDto: LoginDto) {
        const user = await this.usuarioService.findOne({email: loginDto.email});

        if(!user) {
            throw new Error('Invalid Credentials');
        }

        const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);

        if(!isPasswordValid) {
            throw new Error('Invalid Credentials');
        }

        const token = this.jwtService.sign({ name: user.login,email: user.email, role: user.role, sub: user.id });
        return {access_token: token};
    }

    async googleLogin(req) {
        if (!req.user) {
            throw new Error('No user from google');
        }

        // Verifica se o usuário já existe
        let user = await this.usuarioService.findOne({
            where: { email: req.user.email },
        });

        // Se não existir, cria um novo usuário
        if (!user) {
            const usuarioCriado = await this.usuarioService.create({
                email: req.user.email,
                login: `${req.user.firstName} ${req.user.lastName}`,
                password: '', // Usuários do Google não têm senha
                role: Roles.USER, // Role padrão para usuários do Google
            });
            user = usuarioCriado.user; // Acesse o usuário criado
        }

        const token = this.jwtService.sign({ 
            name: user.login, 
            email: user.email, 
            role: user.role, 
            sub: user.id 
        });

        return { access_token: token };
    }
}
