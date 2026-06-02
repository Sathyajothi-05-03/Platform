import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { SocketGateway } from './socket.gateway';

/**
 * Simple Notification Service.
 * Currently logs notifications to the console. Future versions can publish to Kafka,
 * Redis streams, or emit via Socket.io.
 */
@Injectable()
export class NotificationService {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly gateway: SocketGateway,
  ) {}

  /**
   * Log a notification.
   * @param payload Object containing recipient identifier and message text.
   */
  notify(payload: { recipient: string; message: string }) {
    const { recipient, message } = payload;
    // Log locally
    console.log(`[NOTIFY] ${recipient}: ${message}`);
    // Emit via Kafka
    this.kafkaService.emitNotification('notifications', payload);
    // Broadcast via Socket.io
    this.gateway.broadcast('notification', payload);
  }

  /**
   * Helper to notify all relevant parties about an order status change.
   * Delegates to `notify` for each stakeholder.
   */
  orderStatusChanged(
    orderId: string,
    status: string,
    clientId: string,
    riderId?: string,
  ) {
    // Notify client
    this.notify({ recipient: `Client ${clientId}`, message: `Your order #${orderId} is now ${status}` });
    // Notify rider if applicable
    if (riderId) {
      this.notify({ recipient: `Rider ${riderId}`, message: `Order #${orderId} status changed to ${status}` });
    }
    // Notify admin (generic message)
    this.notify({ recipient: 'Admin', message: `Order #${orderId} status changed to ${status}` });
  }
}
