import { Repository, FindManyOptions } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private readonly postRepository;
    constructor(postRepository: Repository<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(options?: FindManyOptions<Post>): Promise<Post[]>;
}
