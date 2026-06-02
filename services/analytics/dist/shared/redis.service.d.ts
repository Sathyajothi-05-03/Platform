import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private client;
    onModuleInit(): void;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSec?: number): Promise<'OK'>;
    del(key: string): Promise<number>;
    onModuleDestroy(): void;
}
