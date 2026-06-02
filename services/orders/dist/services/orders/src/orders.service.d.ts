import { NotificationService } from '../../notifications/src/notification.service';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderTimelineDocument } from './schemas/order-timeline.schema';
export declare class OrdersService {
    private readonly orderModel;
    private readonly timelineModel;
    private readonly notificationService;
    constructor(orderModel: Model<OrderDocument>, timelineModel: Model<OrderTimelineDocument>, notificationService: NotificationService);
    createOrder(createDto: any, clientId: string): Promise<Order>;
    getAdminOrders(filter: any, pagination: {
        page: number;
        limit: number;
    }): Promise<{
        currentPage: number;
        pageSize: number;
        totalCount: number;
        results: Order[];
    }>;
    getClientOrders(clientId: string): Promise<any[]>;
    updateStatus(orderId: string, status: string, proofPhoto?: string): Promise<Order>;
    private nextAllowedStatuses;
}
