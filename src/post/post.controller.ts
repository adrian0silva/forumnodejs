import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { Public } from 'src/auth/public.decorator';
import { CreateResponseDto } from './dto/create-response.dto';
import { User } from 'src/users/entities/user.entity';
import { TokenPayloadParam } from 'src/auth/params/token-payload.params';

@Controller('threads')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto);
  }

  @Public()
  @Get(':id') 
  async findThread(@Param('id') id: string): Promise<PostEntity> {
    // Aqui você pode processar o ID se necessário
    const idCorreto = id.split('.')[1]; // Exemplo de processamento, se necessário
    return this.postService.findOne(parseInt(idCorreto)); // Passa o ID para o serviço
  }

  @Post(':id/new-response')
  async addResponse(
    @Param('id') id: string,
    @Body() createResponseDto: CreateResponseDto,
    @TokenPayloadParam() user: User
  ): Promise<PostEntity> {
    const postId = parseInt(id.split('.')[1]); // ou só parseInt(id) se não tiver o "."
    return this.postService.addResponseToPost(postId, createResponseDto,user);
  }

}