import { Post } from "src/post/entities/post.entity";
export declare class Forum {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    posts: Post[];
}
