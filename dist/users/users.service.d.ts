import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
export declare class UsersService {
    private readonly userRepository;
    private jwtService;
    private redisService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, redisService: RedisService);
    create(createUserDto: CreateUserDto): Promise<{
        user: User;
        token_acesso: string;
        refreshToken: string;
    }>;
    findAll(): Promise<User[]>;
    findOneById(id: number): Promise<User>;
    findOne(where: any): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
