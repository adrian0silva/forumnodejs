"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const roles_enum_1 = require("./role/roles.enum");
const redis_service_1 = require("../redis/redis.service");
let AuthService = class AuthService {
    constructor(usuarioService, jwtService, redisService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async refresh(refresh_token) {
        const storedToken = { value: '' };
        if (!storedToken) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const payload = this.jwtService.verify(refresh_token);
        if (payload.type !== 'refresh') {
            throw new common_1.UnauthorizedException('Invalid token type');
        }
        const usuario = await this.usuarioService.findOneById(payload.sub);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const novoPayload = {
            sub: usuario.id,
            login: usuario.username,
        };
        const novoTokenAcesso = await this.jwtService.signAsync({ ...novoPayload, type: 'access' }, { expiresIn: '15m' });
        const novo_refresh_token = await this.jwtService.signAsync({ ...novoPayload, type: 'refresh' }, { expiresIn: '1h' });
        this.redisService.set(novo_refresh_token, usuario.id);
        return { access_token: novoTokenAcesso, refresh_token: novo_refresh_token };
    }
    async login(loginDto) {
        const user = await this.usuarioService.findOne({ where: { email: loginDto.email } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        const isPasswordValid = bcrypt.compareSync(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid Credentials');
        }
        const novoPayload = {
            sub: user.id,
            login: user.username,
        };
        const access_token = await this.jwtService.signAsync({ ...novoPayload, type: 'access' }, { expiresIn: '15m' });
        const refresh_token = await this.jwtService.signAsync({ ...novoPayload, type: 'refresh' }, { expiresIn: '1h' });
        this.redisService.set(refresh_token, user.id);
        return { access_token,
            refresh_token, };
    }
    async googleLogin(req) {
        if (!req.user) {
            throw new Error('No user from google');
        }
        let user = await this.usuarioService.findOne({
            where: { email: req.user.email },
        });
        if (!user) {
            const usuarioCriado = await this.usuarioService.create({
                email: req.user.email,
                login: `${req.user.firstName} ${req.user.lastName}`,
                password: '',
                role: roles_enum_1.Roles.USER,
            });
            user = usuarioCriado.user;
        }
        const token = this.jwtService.sign({
            name: user.username,
            email: user.email,
            role: user.role,
            sub: user.id
        });
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map