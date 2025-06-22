import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { TopicsModule } from './topics/topics.module';
// import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './database/postgres.config.service';
import { ForumModule } from './forum/forum.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    //ForumModule,
    // AuthModule,
    // UsersModule,
    // TopicsModule,
    // PostsModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h', algorithm: 'HS256'},
    }),
    ForumModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {} 
