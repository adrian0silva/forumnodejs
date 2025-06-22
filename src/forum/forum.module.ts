import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { Post } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Forum,Post]), PostModule],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}