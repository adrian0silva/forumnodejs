import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenPayloadParam } from "../auth/params/token-payload.params";
import { TokenPayloadDto } from "../auth/dto/token-payload.dto";
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Public } from 'src/auth/public.decorator';
import { User } from 'src/users/entities/user.entity';
import { ThreadService } from 'src/thread/thread.service';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService,
    private readonly threadService: ThreadService
  ) {}

  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.forumService.findAll();
  }

  @Public()
  @Get('/:slugName')
  findByName(@Param('slugName') slugName: string) {
    return this.forumService.findThreadsByForumSlug(slugName);
  }

  // @Public()
  // @Get('/:forumName/posts')
  // async findPosts(@Param('forumName') forumName: string) {
  //   const forum = await this.forumService.findOneByTitle(forumName);
  //   return this.postService.findAll({
  //     where: { forumId: forum.id },
  //   });
  // }

  @Post('/:forumName/posts')
  async createPost(@Param('forumName') forumName: string,@Body() body: any,
  @TokenPayloadParam() user: User) {
    const forum = await this.forumService.findOneByTitle(forumName);

    return this.threadService.create({
      ...body,
      forumId: forum.id,
      authorId: user.id
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(+id, updateForumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumService.remove(+id);
  }
}
