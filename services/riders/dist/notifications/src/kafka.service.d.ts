import { OnModuleInit } from '@nestjs/common';
export declare class KafkaService implements OnModuleInit {
    private readonly client;
    onModuleInit(): Promise<void>;
    emitNotification(topic: string, payload: any): Promise<void>;
}
