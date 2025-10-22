import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { ThreadService } from 'src/thread/thread.service';
export declare class ForumService {
    private threadService;
    private forumRepository;
    constructor(threadService: ThreadService, forumRepository: Repository<Forum>);
    create(createForumDto: CreateForumDto): Promise<Forum>;
    findAll(): Promise<Forum[]>;
    findOneByTitle(title: string): Promise<Forum>;
    findThreadsByForumSlug(slugName: string): Promise<Forum>;
    update(id: number, updateForumDto: UpdateForumDto): string;
    remove(id: number): string;
}
