import { Server } from 'socket.io';
import { NotificationService } from './notification.service';
export declare class SocketGateway {
    private readonly notificationService;
    server: Server;
    constructor(notificationService: NotificationService);
    handleGetNotifications(data: any): never[];
    broadcast(event: string, payload: any): void;
}
