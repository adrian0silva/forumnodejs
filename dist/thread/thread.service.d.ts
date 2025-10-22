import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './entities/thread.entity';
import { Repository } from 'typeorm';
export declare class ThreadService {
    private threadRepository;
    constructor(threadRepository: Repository<Thread>);
    create(createThreadDto: CreateThreadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateThreadDto: UpdateThreadDto): string;
    remove(id: number): string;
    findPostsByTheadSlug(slugName: string): Promise<Thread>;
}
