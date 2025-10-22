import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThreadService {
    constructor(
      
      @InjectRepository(Thread)
      private threadRepository: Repository<Thread>,
    ) {}

  create(createThreadDto: CreateThreadDto) {
    return 'This action adds a new thread';
  }

  findAll() {
    return `This action returns all thread`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thread`;
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return `This action updates a #${id} thread`;
  }

  remove(id: number) {
    return `This action removes a #${id} thread`;
  }

  findPostsByTheadSlug(slugName: string) {
    return this.threadRepository.findOne({
      where: { slug: slugName },
      relations: ['posts'],
    });
  }
}
