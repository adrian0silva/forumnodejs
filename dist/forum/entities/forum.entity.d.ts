import { Category } from "../category/category.enum";
import { Thread } from "src/thread/entities/thread.entity";
export declare class Forum {
    id: string;
    category: Category;
    title: string;
    slug: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    threads: Thread[];
    generateSlug(): void;
}
