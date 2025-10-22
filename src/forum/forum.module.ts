import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { Post } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';
import { ThreadModule } from 'src/thread/thread.module';
import { ThreadService } from 'src/thread/thread.service';
import { Thread } from 'src/thread/entities/thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forum,Post,Thread]), PostModule,ThreadModule],
  controllers: [ForumController],
  providers: [ForumService,ThreadService],
})
export class ForumModule {}