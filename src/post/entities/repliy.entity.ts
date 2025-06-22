import { Forum } from "src/forum/entities/forum.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('replies')
export class Reply {

  @PrimaryGeneratedColumn()
  id: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToOne(() => Post, (post) => post.replies)
    post: Post;

    @Column({ type: 'int' })
    postId: number;

    @ManyToOne(() => User, (user) => user.replies)
    author: User;

    @Column({ type: 'int' })
    authorId: number;

}
