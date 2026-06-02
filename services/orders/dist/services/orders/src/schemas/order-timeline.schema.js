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
exports.OrderTimelineSchema = exports.OrderTimeline = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
let OrderTimeline = class OrderTimeline {
    order;
    status;
    timestamp;
    proofPhoto;
};
exports.OrderTimeline = OrderTimeline;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Order', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderTimeline.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: order_schema_1.OrderStatus, required: true }),
    __metadata("design:type", String)
], OrderTimeline.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], OrderTimeline.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OrderTimeline.prototype, "proofPhoto", void 0);
exports.OrderTimeline = OrderTimeline = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OrderTimeline);
exports.OrderTimelineSchema = mongoose_1.SchemaFactory.createForClass(OrderTimeline);
//# sourceMappingURL=order-timeline.schema.js.map