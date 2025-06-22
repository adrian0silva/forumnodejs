import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
export declare class ForumService {
    private postService;
    private forumRepository;
    constructor(postService: PostService, forumRepository: Repository<Forum>);
    create(createForumDto: CreateForumDto): Promise<Forum>;
    findAll(): Promise<Forum[]>;
    findOneByTitle(title: string): Promise<Forum>;
    findPosts(forumName: string): Promise<any>;
    update(id: number, updateForumDto: UpdateForumDto): string;
    remove(id: number): string;
}
