import { NotificationService } from '../../notifications/src/notification.service';
import { Model } from 'mongoose';
import { Rider, RiderDocument } from './rider.schema';
import { UpdateRiderStatusDto, UpdateRiderLocationDto } from './dto/update-rider.dto';
import { Redis } from 'ioredis';
export declare class RidersService {
    private readonly riderModel;
    private readonly redis;
    private readonly notificationService;
    constructor(riderModel: Model<RiderDocument>, redis: Redis, notificationService: NotificationService);
    findAll(): Promise<Rider[]>;
    updateStatus(id: string, dto: UpdateRiderStatusDto): Promise<Rider>;
    updateLocation(id: string, dto: UpdateRiderLocationDto): Promise<Rider>;
}
