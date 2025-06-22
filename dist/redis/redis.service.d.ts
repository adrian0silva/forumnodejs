import { ConfigService } from '@nestjs/config';
export declare class RedisService {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    set(key: string, value: any, ttl?: number): Promise<void>;
    get(key: string): Promise<any>;
    exists(key: string): Promise<any>;
    del(key: string): Promise<void>;
}
