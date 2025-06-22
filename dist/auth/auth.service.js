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
const bcrypt_1 = require("bcrypt");
const users_service_1 = require("../users/users.service");
const roles_enum_1 = require("./role/roles.enum");
let AuthService = class AuthService {
    constructor(usuarioService, jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.usuarioService.findOne({ email: loginDto.email });
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        const isPasswordValid = bcrypt_1.default.compareSync(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Credentials');
        }
        const token = this.jwtService.sign({ name: user.login, email: user.email, role: user.role, sub: user.id });
        return { access_token: token };
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
            name: user.login,
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
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map