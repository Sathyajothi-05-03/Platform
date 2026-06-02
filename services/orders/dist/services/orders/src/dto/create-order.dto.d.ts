export declare enum OrderPriority {
    NORMAL = "normal",
    URGENT = "urgent"
}
export declare class CreateOrderDto {
    pickupAddress: string;
    dropAddress: string;
    packageDetails: string;
    priority: OrderPriority;
}
