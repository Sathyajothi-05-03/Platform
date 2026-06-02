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
exports.RidersService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../../notifications/src/notification.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rider_schema_1 = require("./rider.schema");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let RidersService = class RidersService {
    riderModel;
    redis;
    notificationService;
    constructor(riderModel, redis, notificationService) {
        this.riderModel = riderModel;
        this.redis = redis;
        this.notificationService = notificationService;
    }
    async findAll() {
        return this.riderModel.find().exec();
    }
    async updateStatus(id, dto) {
        const rider = await this.riderModel.findByIdAndUpdate(id, { status: dto.status }, { new: true }).exec();
        if (!rider)
            throw new common_1.NotFoundException('Rider not found');
        this.notificationService.notify({
            recipient: `Rider ${id}`,
            message: `Status changed to ${dto.status}`,
        });
        this.notificationService.notify({ recipient: 'Admin', message: `Rider ${id} status changed to ${dto.status}` });
        return rider;
    }
    async updateLocation(id, dto) {
        const location = { lat: Number(dto.lat), lng: Number(dto.lng) };
        const rider = await this.riderModel.findByIdAndUpdate(id, { location }, { new: true }).exec();
        if (!rider)
            throw new common_1.NotFoundException('Rider not found');
        await this.redis.set(`rider:${id}:location`, JSON.stringify(location));
        this.notificationService.notify({
            recipient: `Rider ${id}`,
            message: `Location updated to (${location.lat}, ${location.lng})`,
        });
        this.notificationService.notify({ recipient: 'Admin', message: `Rider ${id} location updated` });
        return rider;
    }
};
exports.RidersService = RidersService;
exports.RidersService = RidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rider_schema_1.Rider.name)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ioredis_2.Redis,
        notification_service_1.NotificationService])
], RidersService);
//# sourceMappingURL=riders.service.js.map