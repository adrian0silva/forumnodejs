import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { Reply } from './entities/repliy.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Reply)
    private readonly repliesRepository: Repository<Reply>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postRepository.find({
      ...options,
      relations: ['author', 'forum'],
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['author', 'forum', 'replies', 'replies.author'], // Inclui a relação do autor dos replies
    });
  }

  async addResponseToPost(postId: number, dto: CreateResponseDto,user): Promise<any> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['replies'], // certifique-se que a relação está carregada
    });
  
    if (!post) {
      throw new NotFoundException('Tópico não encontrado');
    }
  
    const resposta = this.repliesRepository.create({
      content: dto.content,
      post: post,
      authorId: user.id
    });
  
    await this.repliesRepository.save(resposta);
  
    // Atualiza e retorna o post com a nova resposta

    return this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'forum', 'replies', 'replies.author'], // Inclui a relação do autor dos replies
    });
  }
  
}