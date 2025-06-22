import { User } from "src/users/entities/user.entity";
import { Post } from "./post.entity";
export declare class Reply {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    post: Post;
    postId: number;
    author: User;
    authorId: number;
}
