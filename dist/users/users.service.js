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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("../redis/redis.service");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, redisService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.redisService = redisService;
    }
    async create(createUserDto) {
        const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        const usuarioCriado = await this.userRepository.save(user).catch(error => {
            if (error.code === '23505') {
                throw new common_1.ConflictException({
                    message: "Não foi possível completar a solicitação: o email já está em uso.",
                });
            }
            throw error;
        });
        const payload = {
            sub: usuarioCriado.id,
            login: usuarioCriado.username,
        };
        const access_token = await this.jwtService.signAsync({ ...payload, type: 'access' }, { expiresIn: '15m' });
        const refresh_token = await this.jwtService.signAsync({ ...payload, type: 'refresh' }, { expiresIn: '1h' });
        console.log('antes de entrar no redis');
        this.redisService.set(refresh_token, usuarioCriado.id);
        console.log('salvou no redis');
        return {
            user: usuarioCriado,
            access_token,
            refresh_token,
        };
    }
    findAll() {
        return this.userRepository.find();
    }
    findOneById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    findOne(where) {
        return this.userRepository.findOne(where);
    }
    update(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
        }
        return this.userRepository.update(id, updateUserDto);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        redis_service_1.RedisService])
], UsersService);
//# sourceMappingURL=users.service.js.map