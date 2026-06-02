import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus } from './order.schema';

export type OrderTimelineDocument = OrderTimeline & Document;

@Schema({ timestamps: true })
export class OrderTimeline {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  proofPhoto?: string;
}

export const OrderTimelineSchema = SchemaFactory.createForClass(OrderTimeline);
