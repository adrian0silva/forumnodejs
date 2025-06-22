import { Forum } from "src/forum/entities/forum.entity";
import { User } from "src/users/entities/user.entity";
export declare class Post {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    forum: Forum;
    forumId: number;
    author: User;
    authorId: number;
}
