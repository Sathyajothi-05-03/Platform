import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OrderPriority {
  NORMAL = 'normal',
  URGENT = 'urgent',
}

export enum OrderStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Rider' })
  rider?: Types.ObjectId;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  dropAddress: string;

  @Prop({ required: true })
  @IsString()
  packageDetails: string;

  @Prop({ type: String, enum: OrderPriority, default: OrderPriority.NORMAL })
  @IsEnum(OrderPriority)
  priority: OrderPriority;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  // Simple zone extraction – in real world this would be derived via geo‑lookup.
  @Prop({ required: true })
  @IsString()
  zone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
