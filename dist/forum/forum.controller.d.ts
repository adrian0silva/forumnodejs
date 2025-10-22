import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { User } from 'src/users/entities/user.entity';
import { ThreadService } from 'src/thread/thread.service';
export declare class ForumController {
    private readonly forumService;
    private readonly threadService;
    constructor(forumService: ForumService, threadService: ThreadService);
    create(createForumDto: CreateForumDto): Promise<import("./entities/forum.entity").Forum>;
    findAll(): Promise<import("./entities/forum.entity").Forum[]>;
    findByName(slugName: string): Promise<import("./entities/forum.entity").Forum>;
    createPost(forumName: string, body: any, user: User): Promise<string>;
    update(id: string, updateForumDto: UpdateForumDto): string;
    remove(id: string): string;
}
