import { IsEnum, IsOptional, IsString, Matches, IsUrl } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsUrl()
  @Matches(/^data:image\/\w+;base64,/, { message: 'must be a base64 data URL' })
  proofPhoto?: string;
}
