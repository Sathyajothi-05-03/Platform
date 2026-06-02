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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const kafka_service_1 = require("./kafka.service");
const socket_gateway_1 = require("./socket.gateway");
let NotificationService = class NotificationService {
    kafkaService;
    gateway;
    constructor(kafkaService, gateway) {
        this.kafkaService = kafkaService;
        this.gateway = gateway;
    }
    notify(payload) {
        const { recipient, message } = payload;
        console.log(`[NOTIFY] ${recipient}: ${message}`);
        this.kafkaService.emitNotification('notifications', payload);
        this.gateway.broadcast('notification', payload);
    }
    orderStatusChanged(orderId, status, clientId, riderId) {
        this.notify({ recipient: `Client ${clientId}`, message: `Your order #${orderId} is now ${status}` });
        if (riderId) {
            this.notify({ recipient: `Rider ${riderId}`, message: `Order #${orderId} status changed to ${status}` });
        }
        this.notify({ recipient: 'Admin', message: `Order #${orderId} status changed to ${status}` });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_service_1.KafkaService,
        socket_gateway_1.SocketGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map