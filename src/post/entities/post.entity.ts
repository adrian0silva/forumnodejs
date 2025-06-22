import { Forum } from "src/forum/entities/forum.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./repliy.entity";

@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

    @Column({ type: 'varchar', length: 255 })
  title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToOne(() => Forum, (forum) => forum.posts)
    forum: Forum;

    @Column({ type: 'int' })
    forumId: number;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @OneToMany(() => Reply, (reply) => reply.post)
    replies: Reply[];

    @Column({ type: 'int' })
    authorId: number;

}
