import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { User } from 'src/users/entities/user.entity';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<PostEntity>;
    findThread(id: string): Promise<PostEntity>;
    addResponse(id: string, createResponseDto: CreateResponseDto, user: User): Promise<PostEntity>;
}
