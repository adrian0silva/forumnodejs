import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; // Importar a entidade User
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Injetar o repositório do TypeORM
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10); // Hash da senha
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    
    const usuarioCriado = await this.userRepository.save(user).catch(error => {
      if (error.code === '23505') { // Verifica se é um erro de duplicidade
        throw new ConflictException({
          message: "Não foi possível completar a solicitação: o email já está em uso.",
        });
      }
      throw error; // Lança outros erros
    }); // Salvar o usuário

    const payload = {
      sub: usuarioCriado.id, // subject = sujeito
      login: usuarioCriado.login,
    };
    const token_acesso = await this.jwtService.signAsync(
      { ...payload, type: 'access' },
      { expiresIn: '15m' },
    );

    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: '1h' },
    );
    this.redisService.set(refreshToken, usuarioCriado.id);

    return {
      user: usuarioCriado, // Retornar o usuário criado
      token_acesso,
      refreshToken,
    };
  }

  findAll() {
    return this.userRepository.find(); // Encontrar todos os usuários
  }
  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } }); // Encontrar um usuário pelo ID
  }

  findOne(where) {
    return this.userRepository.findOne(where); // Encontrar um usuário pelo ID
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10); // Hash da nova senha
    }
    return this.userRepository.update(id, updateUserDto); // Atualizar o usuário
  }

  remove(id: number) {
    return this.userRepository.delete(id); // Remover o usuário
  }
}