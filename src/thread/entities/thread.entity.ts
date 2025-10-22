import { Forum } from "src/forum/entities/forum.entity";
import { Post } from "src/post/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('threads')
export class Thread {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => Forum, forum => forum.id, { onDelete: 'CASCADE' })
    forum: Forum;

    @Column()
    forumId: string;

    @ManyToOne(() => User, (user: User) => user.id, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: string;

    @OneToMany(() => Post, post => post.thread)
    posts: Post[];

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (!this.slug && this.title) {
            this.slug = this.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
                .replace(/\s+/g, '-')     // Espaços por hífens
                .replace(/--+/g, '-');    // Múltiplos hífens consecutivos
        }
    }
}
