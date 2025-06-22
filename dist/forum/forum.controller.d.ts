import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { PostService } from 'src/post/post.service';
import { User } from 'src/users/entities/user.entity';
export declare class ForumController {
    private readonly forumService;
    private readonly postService;
    constructor(forumService: ForumService, postService: PostService);
    create(createForumDto: CreateForumDto): Promise<import("./entities/forum.entity").Forum>;
    findAll(): Promise<import("./entities/forum.entity").Forum[]>;
    findByName(forumName: string): Promise<import("./entities/forum.entity").Forum>;
    findPosts(forumName: string): Promise<import("../post/entities/post.entity").Post[]>;
    createPost(forumName: string, body: any, user: User): Promise<import("../post/entities/post.entity").Post>;
    update(id: string, updateForumDto: UpdateForumDto): string;
    remove(id: string): string;
}
