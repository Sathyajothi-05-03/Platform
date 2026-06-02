import { Module } from '@nestjs/common';
import { NotificationsModule } from '../../notifications/src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderTimeline, OrderTimelineSchema } from './schemas/order-timeline.schema';
import { EventsGateway } from './events.gateway';
import { RidersModule } from '../../riders/src/riders.module';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderTimeline.name, schema: OrderTimelineSchema },
    ]),
    RidersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, EventsGateway],
  exports: [OrdersService],
})
export class OrdersModule {}
