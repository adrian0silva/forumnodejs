import { Roles } from '../../auth/role/roles.enum';
import { Post } from 'src/post/entities/post.entity';
import { Reply } from 'src/post/entities/repliy.entity';
export declare class User {
    id: number;
    login: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    replies: Reply[];
}
