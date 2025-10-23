import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      url: this.configService.get<string>('UPSTASH_REDIS_REST_URL'),
      token: this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN'),
    });
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, JSON.stringify(value));
    } else {
      await this.client.set(key, JSON.stringify(value));
    }
  }

  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data as string);
  }

  async exists(key: string): Promise<number> {
    return await this.client.exists(key);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}

