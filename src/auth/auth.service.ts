import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { Roles } from './role/roles.enum';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {

    constructor(private usuarioService: UsersService,private jwtService: JwtService,
        private redisService: RedisService,
    ) {}

    async refresh(refresh_token: string) {
        const storedToken = { value: '' };
        if (!storedToken) {
          throw new UnauthorizedException('Invalid refresh token');
        }
    
        const payload = this.jwtService.verify(refresh_token);
        if (payload.type !== 'refresh') {
          throw new UnauthorizedException('Invalid token type');
        }
        const usuario = await this.usuarioService.findOneById(payload.sub);
        if (!usuario) {
          throw new UnauthorizedException('Invalid refresh token');
        }
    
        const novoPayload: any = {
          sub: usuario.id, // subject = sujeito
          login: usuario.username,

        };
    
        const novoTokenAcesso = await this.jwtService.signAsync(
          { ...novoPayload, type: 'access' },
          { expiresIn: '15m' },
        );
    
        const novo_refresh_token = await this.jwtService.signAsync(
          { ...novoPayload, type: 'refresh' },
          { expiresIn: '1h' },
        );
    
        this.redisService.set(novo_refresh_token, usuario.id);
        return { access_token: novoTokenAcesso, refresh_token: novo_refresh_token };
      }
    async login(loginDto: LoginDto) {
        const user = await this.usuarioService.findOne({where: {email: loginDto.email}});

        if(!user) {
            throw new BadRequestException('Invalid Credentials');
        }

        const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);

        if(!isPasswordValid) {
            throw new BadRequestException('Invalid Credentials');
        }

        const novoPayload: any = {
            sub: user.id, // subject = sujeito
            login: user.username,
  
          };

        const access_token = await this.jwtService.signAsync(
            { ...novoPayload, type: 'access' },
            { expiresIn: '15m' },
          );
      
          const refresh_token = await this.jwtService.signAsync(
            { ...novoPayload, type: 'refresh' },
            { expiresIn: '1h' },
          );
          this.redisService.set(refresh_token, user.id);
                  
        return { access_token,
            refresh_token,};
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
            name: user.username, 
            email: user.email, 
            role: user.role, 
            sub: user.id 
        });

        return { access_token: token };
    }
}
