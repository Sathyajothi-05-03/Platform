import { KafkaService } from './kafka.service';
import { SocketGateway } from './socket.gateway';
export declare class NotificationService {
    private readonly kafkaService;
    private readonly gateway;
    constructor(kafkaService: KafkaService, gateway: SocketGateway);
    notify(payload: {
        recipient: string;
        message: string;
    }): void;
    orderStatusChanged(orderId: string, status: string, clientId: string, riderId?: string): void;
}
