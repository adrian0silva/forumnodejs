import { Repository, FindManyOptions } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateResponseDto } from './dto/create-response.dto';
import { Reply } from './entities/repliy.entity';
export declare class PostService {
    private readonly postRepository;
    private readonly repliesRepository;
    constructor(postRepository: Repository<Post>, repliesRepository: Repository<Reply>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(options?: FindManyOptions<Post>): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    addResponseToPost(postId: number, dto: CreateResponseDto, user: any): Promise<any>;
}
