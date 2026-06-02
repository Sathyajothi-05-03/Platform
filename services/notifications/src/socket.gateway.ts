import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  // Example: client can request recent notifications (placeholder)
  @SubscribeMessage('getNotifications')
  handleGetNotifications(@MessageBody() data: any) {
    // In a real implementation, fetch from DB/cache and emit
    return [];
  }

  // Helper for NotificationService to push a message to all connected clients
  broadcast(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
