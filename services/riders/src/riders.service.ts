import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationService } from '../../notifications/src/notification.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rider, RiderDocument } from './rider.schema';
import { UpdateRiderStatusDto, UpdateRiderLocationDto } from './dto/update-rider.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RidersService {
  constructor(
    @InjectModel(Rider.name) private readonly riderModel: Model<RiderDocument>,
    @InjectRedis() private readonly redis: Redis,
    private readonly notificationService: NotificationService,
  ) {}

  /** Find all riders – admin view */
  async findAll(): Promise<Rider[]> {
    return this.riderModel.find().exec();
  }

  /** Update rider status (online/offline/busy) */
  async updateStatus(id: string, dto: UpdateRiderStatusDto): Promise<Rider> {
    const rider = await this.riderModel.findByIdAndUpdate(
      id,
      { status: dto.status },
      { new: true },
    ).exec();
    if (!rider) throw new NotFoundException('Rider not found');
    // Notify rider and admin about status change
    this.notificationService.notify({
      recipient: `Rider ${id}`,
      message: `Status changed to ${dto.status}`,
    });
    this.notificationService.notify({ recipient: 'Admin', message: `Rider ${id} status changed to ${dto.status}` });
    return rider;
  }

  /** Update rider location and cache in Redis */
  async updateLocation(id: string, dto: UpdateRiderLocationDto): Promise<Rider> {
    const location = { lat: Number(dto.lat), lng: Number(dto.lng) };
    const rider = await this.riderModel.findByIdAndUpdate(
      id,
      { location },
      { new: true },
    ).exec();
    if (!rider) throw new NotFoundException('Rider not found');
    // Cache location with key `rider:{id}:location`
    await this.redis.set(`rider:${id}:location`, JSON.stringify(location));
    // Notify rider and admin about location update
    this.notificationService.notify({
      recipient: `Rider ${id}`,
      message: `Location updated to (${location.lat}, ${location.lng})`,
    });
    this.notificationService.notify({ recipient: 'Admin', message: `Rider ${id} location updated` });
    return rider;
  }
}

