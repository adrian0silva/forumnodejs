import { Forum } from "src/forum/entities/forum.entity";
import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
export declare class Thread {
    id: string;
    title: string;
    slug: string;
    description: string;
    forum: Forum;
    forumId: string;
    user: User;
    userId: string;
    posts: Post[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
    generateSlug(): void;
}
