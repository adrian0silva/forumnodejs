import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.enum";
import { Thread } from "src/thread/entities/thread.entity";

@Entity('forums')
export class Forum {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: Category, default: Category.VALE_TUDO })
    category: Category; 

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    slug: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => Thread, thread => thread.forum)
    threads: Thread[];
    // @OneToMany(() => Post, (post) => post.forum)
    // posts: Post[];

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')   // Remove caracteres especiais
            .replace(/\s+/g, '-')       // Substitui espaços por hífens
            .replace(/--+/g, '-');      // Remove múltiplos hífens consecutivos
    }
}
