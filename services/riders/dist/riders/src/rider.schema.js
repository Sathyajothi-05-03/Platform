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
exports.RiderSchema = exports.Rider = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const roles_enum_1 = require("../../shared/constants/roles.enum");
let Rider = class Rider {
    name;
    email;
    password;
    role;
    status;
    activeOrders;
    location;
};
exports.Rider = Rider;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Rider.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Rider.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Rider.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: roles_enum_1.Role, default: roles_enum_1.Role.Rider }),
    __metadata("design:type", String)
], Rider.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'offline' }),
    __metadata("design:type", String)
], Rider.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Rider.prototype, "activeOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: { lat: 0, lng: 0 } }),
    __metadata("design:type", Object)
], Rider.prototype, "location", void 0);
exports.Rider = Rider = __decorate([
    (0, mongoose_1.Schema)()
], Rider);
exports.RiderSchema = mongoose_1.SchemaFactory.createForClass(Rider);
//# sourceMappingURL=rider.schema.js.map