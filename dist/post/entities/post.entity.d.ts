import { Thread } from 'src/thread/entities/thread.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Post {
    id: string;
    content: string;
    thread: Thread;
    threadId: string;
    user: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
