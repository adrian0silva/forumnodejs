import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { Roles } from '../../auth/role/roles.enum';
import { Post } from 'src/post/entities/post.entity';
import { Reply } from 'src/post/entities/repliy.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Reply, (reply) => reply.author)
  replies: Reply[]
//   @OneToMany(() => Post, post => post.author)
//   posts: Post[];
}
