import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum OrderPriority {
  NORMAL = 'normal',
  URGENT = 'urgent',
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @IsString()
  @IsNotEmpty()
  dropAddress: string;

  @IsString()
  @IsNotEmpty()
  packageDetails: string;

  @IsEnum(OrderPriority)
  priority: OrderPriority;
}
