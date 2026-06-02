import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

/**
 * Simple Redis wrapper used across services.
 *
 * - Connects to the Redis instance defined by the `REDIS_URL` environment variable.
 * - Provides `get`, `set`, and `del` helpers.
 * - Implements `OnModuleInit` / `OnModuleDestroy` so the client is
 *   automatically closed when the NestJS app shuts down.
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    this.client = new Redis(url);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSec?: number): Promise<'OK'> {
    if (ttlSec) {
      return this.client.set(key, value, 'EX', ttlSec);
    }
    return this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }
}
