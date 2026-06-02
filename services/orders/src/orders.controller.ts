import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../../auth/src/jwt-auth.guard';
import { RolesGuard } from '../../auth/src/roles.guard';
import { Roles } from '../../auth/src/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('client')
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const user = req.user;
    const order = await this.ordersService.createOrder(createOrderDto, user.id);
    return { statusCode: HttpStatus.CREATED, data: order };
  }

  @Roles('admin')
  @Get()
  async getAllOrders(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('zone') zone?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const pagination = await this.ordersService.getAdminOrders({
      status,
      priority,
      zone,
      startDate,
      endDate,
    }, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    });
    return { statusCode: HttpStatus.OK, data: pagination };
  }

  @Roles('client')
  @Get('my')
  async getMyOrders(@Req() req: any) {
    const user = req.user;
    const orders = await this.ordersService.getClientOrders(user.id);
    return { statusCode: HttpStatus.OK, data: orders };
  }

  @Roles('rider')
  @Patch(':id/status')
  async updateStatus(
    @Param('id') orderId: string,
    @Body() updateDto: UpdateOrderStatusDto,
    @Req() req: any,
  ) {
    const rider = req.user;
    const updated = await this.ordersService.updateStatus(
      orderId,
      updateDto.status,
      updateDto.proofPhoto,
    );
    return { statusCode: HttpStatus.OK, data: updated };
  }
}
