import { HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto, req: any): Promise<{
        statusCode: HttpStatus;
        data: import("./schemas/order.schema").Order;
    }>;
    getAllOrders(page?: string, limit?: string, status?: string, priority?: string, zone?: string, startDate?: string, endDate?: string): Promise<{
        statusCode: HttpStatus;
        data: {
            currentPage: number;
            pageSize: number;
            totalCount: number;
            results: import("./schemas/order.schema").Order[];
        };
    }>;
    getMyOrders(req: any): Promise<{
        statusCode: HttpStatus;
        data: any[];
    }>;
    updateStatus(orderId: string, updateDto: UpdateOrderStatusDto, req: any): Promise<{
        statusCode: HttpStatus;
        data: import("./schemas/order.schema").Order;
    }>;
}
