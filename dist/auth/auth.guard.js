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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("./public.decorator");
const users_service_1 = require("../users/users.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, usuarioService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
    }
    async canActivate(context) {
        console.log('AuthGuard: Verificando rota');
        console.log('AuthGuard: Handler:', context.getHandler().name);
        console.log('AuthGuard: Class:', context.getClass().name);
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(this.reflector);
        console.log('AuthGuard: isPublic =', isPublic);
        if (isPublic) {
            console.log('AuthGuard: Rota é pública, permitindo acesso');
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) {
            console.log('AuthGuard: Token não fornecido');
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.jwtService.verify(token, { algorithms: ['HS256'] });
            console.log('AuthGuard: Token válido, buscando usuário');
            const user = await this.usuarioService.findOne({
                id: payload.sub
            });
            if (!user) {
                console.log('AuthGuard: Usuário não encontrado');
                throw new common_1.UnauthorizedException('User not found');
            }
            console.log('AuthGuard: Usuário encontrado, permitindo acesso');
            request.user = user;
            return true;
        }
        catch (error) {
            console.log('AuthGuard: Erro ao verificar token:', error);
            if (error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token expired', { cause: error });
            }
            throw new common_1.UnauthorizedException(error.message, { cause: error });
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService, users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map