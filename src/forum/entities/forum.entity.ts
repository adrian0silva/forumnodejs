import { Post } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('forums')
export class Forum {

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

    @OneToMany(() => Post, (post) => post.forum)
    posts: Post[];
}
