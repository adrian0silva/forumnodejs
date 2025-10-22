import { Roles } from "src/auth/role/roles.enum";
import { Post } from "src/post/entities/post.entity";
import { Thread } from "src/thread/entities/thread.entity";
import { Column, Entity, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    username: string;

    @Column({ type: 'text', nullable: false, unique: true })
    email: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: true, default: null })
    image: string | null;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    /* === RELAÇÕES === */

    @OneToMany(() => Thread, thread => thread.user)
    threads: Thread[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}
