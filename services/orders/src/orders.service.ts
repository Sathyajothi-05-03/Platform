import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NotificationService } from '../../notifications/src/notification.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { OrderTimeline, OrderTimelineDocument } from './schemas/order-timeline.schema';
import { Role } from '../../../shared/constants/roles.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(OrderTimeline.name) private readonly timelineModel: Model<OrderTimelineDocument>,
    private readonly notificationService: NotificationService
  ) {}

  // Create a new order and assign a rider (simplified)
  async createOrder(createDto: any, clientId: string): Promise<Order> {
    // Basic order creation – real implementation will include assignment logic
        const order = new this.orderModel({
      ...createDto,
      client: new Types.ObjectId(clientId),
      status: 'pending',
      createdAt: new Date(),
    });
    await order.save();
    // Notify client of order creation
    await this.notificationService.notify({
      recipient: clientId,
      message: `Order #${order._id} created`,
    });
    // Create initial timeline entry
    const timeline = new this.timelineModel({
      orderId: order._id,
      status: 'pending',
      timestamp: new Date(),
    });
    await timeline.save();
    return order;
  }

  // Retrieve orders for admin with paging (placeholder)
  async getAdminOrders(filter: any, pagination: { page: number; limit: number }): Promise<{ currentPage: number; pageSize: number; totalCount: number; results: Order[] }> {
    const query = this.orderModel.find(filter);
    const totalCount = await this.orderModel.countDocuments(filter);
    const results = await query
      .skip((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit)
      .exec();
    return {
      currentPage: pagination.page,
      pageSize: pagination.limit,
      totalCount,
      results,
    };
  }

  // Retrieve orders for a specific client (includes timeline)
  async getClientOrders(clientId: string): Promise<any[]> {
    const orders = await this.orderModel.find({ client: clientId }).exec();
    const enriched: any[] = [];
    for (const o of orders) {
      const timeline = await this.timelineModel.find({ orderId: o._id }).sort({ timestamp: 1 }).exec();
      enriched.push({ ...o.toObject(), timeline });
    }
    return enriched;
  }

  // Update order status – validates strict flow (simplified)
  async updateStatus(orderId: string, status: string, proofPhoto?: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    const allowed = this.nextAllowedStatuses(order.status);
    if (!allowed.includes(status)) {
      throw new BadRequestException(`Invalid status transition from ${order.status} to ${status}`);
    }
        order.status = status as any;
    await order.save();
    // Add timeline entry
    const entry = new this.timelineModel({
      orderId: order._id,
      status,
      proofPhoto,
      timestamp: new Date(),
    });
    await entry.save();
    // Notify relevant parties based on status
    const msgMap: Record<string, string> = {
      assigned: `Order #${order._id} assigned to rider`,
      picked_up: `Order #${order._id} picked up`,
      delivered: `Order #${order._id} delivered`,
      failed: `Order #${order._id} failed`,
    };
    const message = msgMap[status] || `Order #${order._id} status updated to ${status}`;
    await this.notificationService.notify({
      recipient: order.client.toString(),
      message,
    });
    return order;
  }

  private nextAllowedStatuses(current: string): string[] {
    const flow: Record<string, string[]> = {
      pending: ['assigned'],
      assigned: ['picked_up', 'failed'],
      picked_up: ['delivered', 'failed'],
      delivered: [],
      failed: [],
    };
    return flow[current] ?? [];
  }
}
