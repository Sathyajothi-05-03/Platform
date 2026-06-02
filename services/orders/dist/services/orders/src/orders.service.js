"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../../notifications/src/notification.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const order_timeline_schema_1 = require("./schemas/order-timeline.schema");
let OrdersService = class OrdersService {
    orderModel;
    timelineModel;
    notificationService;
    constructor(orderModel, timelineModel, notificationService) {
        this.orderModel = orderModel;
        this.timelineModel = timelineModel;
        this.notificationService = notificationService;
    }
    async createOrder(createDto, clientId) {
        const order = new this.orderModel({
            ...createDto,
            client: new mongoose_2.Types.ObjectId(clientId),
            status: 'pending',
            createdAt: new Date(),
        });
        await order.save();
        await this.notificationService.notify({
            recipient: clientId,
            message: `Order #${order._id} created`,
        });
        const timeline = new this.timelineModel({
            orderId: order._id,
            status: 'pending',
            timestamp: new Date(),
        });
        await timeline.save();
        return order;
    }
    async getAdminOrders(filter, pagination) {
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
    async getClientOrders(clientId) {
        const orders = await this.orderModel.find({ client: clientId }).exec();
        const enriched = [];
        for (const o of orders) {
            const timeline = await this.timelineModel.find({ orderId: o._id }).sort({ timestamp: 1 }).exec();
            enriched.push({ ...o.toObject(), timeline });
        }
        return enriched;
    }
    async updateStatus(orderId, status, proofPhoto) {
        const order = await this.orderModel.findById(orderId);
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const allowed = this.nextAllowedStatuses(order.status);
        if (!allowed.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${order.status} to ${status}`);
        }
        order.status = status;
        await order.save();
        const entry = new this.timelineModel({
            orderId: order._id,
            status,
            proofPhoto,
            timestamp: new Date(),
        });
        await entry.save();
        const msgMap = {
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
    nextAllowedStatuses(current) {
        const flow = {
            pending: ['assigned'],
            assigned: ['picked_up', 'failed'],
            picked_up: ['delivered', 'failed'],
            delivered: [],
            failed: [],
        };
        return flow[current] ?? [];
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_timeline_schema_1.OrderTimeline.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map