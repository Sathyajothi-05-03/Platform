import { Module } from '@nestjs/common';
import { NotificationsModule } from '../../notifications/src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RidersService } from './riders.service';
import { RidersController } from './riders.controller';
import { Rider, RiderSchema } from './rider.schema';
import { AppRedisModule } from './redis.module';

@Module({
  imports: [
    NotificationsModule,
    AppRedisModule,
  ],
  providers: [RidersService],
  controllers: [RidersController],
  exports: [RidersService],
})
export class RidersModule {}

