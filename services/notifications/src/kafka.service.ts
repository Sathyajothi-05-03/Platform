import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class KafkaService implements OnModuleInit {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  async onModuleInit() {
    // Ensure the client connects and subscriptions are ready
    await this.client.connect();
  }

  async emitNotification(topic: string, payload: any) {
    // Sends a message to the specified Kafka topic
    this.client.emit(topic, payload);
  }
}
