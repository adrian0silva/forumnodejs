import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Reply } from './entities/repliy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post,Reply])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}