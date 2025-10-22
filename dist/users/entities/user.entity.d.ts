import { Roles } from "src/auth/role/roles.enum";
import { Post } from "src/post/entities/post.entity";
import { Thread } from "src/thread/entities/thread.entity";
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    role: Roles;
    createdAt: Date;
    updatedAt: Date;
    threads: Thread[];
    posts: Post[];
}
