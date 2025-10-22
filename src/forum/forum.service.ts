import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { ThreadService } from 'src/thread/thread.service';

@Injectable()
export class ForumService {
  constructor(
    private threadService: ThreadService,
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
  ) {}
  async create(createForumDto: CreateForumDto): Promise<Forum> {
    const forum = this.forumRepository.create(createForumDto);
    return this.forumRepository.save(forum);
  }

  async findAll(): Promise<Forum[]> {
    return this.forumRepository.find();
  }

  findOneByTitle(title: string): Promise<Forum> {
    return this.forumRepository.findOne({ where: { title } });
  }

  async findThreadsByForumSlug(slugName: string): Promise<Forum> {
    return this.forumRepository.findOne({
      where: { slug: slugName },
      relations: ['threads'],
    });
  }

  // async findPosts(forumName: string): Promise<any> {
  //   const forum = await this.findOneByTitle(forumName)
  //   // Assuming there's a relation to posts in the Forum entity
  //   return this.postService.findAll({
  //     where: { forumId: forum.id },
  //   });

  // }

  update(id: number, updateForumDto: UpdateForumDto) {
    return `This action updates a #${id} forum`;
  }

  remove(id: number) {
    return `This action removes a #${id} forum`;
  }
}
