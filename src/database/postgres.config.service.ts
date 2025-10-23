import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('no postgres.config.service');
    console.log('DB_HOST:', this.configService.get<string>('DB_HOST'));
    console.log('DATABASE_URL host:', process.env.DATABASE_URL);
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      url: process.env.DATABASE_URL,        
      ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
      synchronize: true
    //  logging: ['query', 'error'],
    // logger: 'advanced-console',
    // logging: true,
    };
  }
}
