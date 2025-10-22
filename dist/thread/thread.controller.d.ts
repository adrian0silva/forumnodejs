import { ThreadService } from './thread.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadController {
    private readonly threadService;
    constructor(threadService: ThreadService);
    create(createThreadDto: CreateThreadDto): string;
    findAll(): string;
    findOne(slug: string): Promise<import("./entities/thread.entity").Thread>;
    update(id: string, updateThreadDto: UpdateThreadDto): string;
    remove(id: string): string;
}
