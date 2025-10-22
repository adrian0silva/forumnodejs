import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { Thread } from './entities/thread.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Thread]), PostModule],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
