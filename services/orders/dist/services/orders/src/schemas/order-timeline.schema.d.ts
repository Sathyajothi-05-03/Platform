import { Document, Types } from 'mongoose';
import { OrderStatus } from './order.schema';
export type OrderTimelineDocument = OrderTimeline & Document;
export declare class OrderTimeline {
    order: Types.ObjectId;
    status: OrderStatus;
    timestamp: Date;
    proofPhoto?: string;
}
export declare const OrderTimelineSchema: import("mongoose").Schema<OrderTimeline, import("mongoose").Model<OrderTimeline, any, any, any, any, any, OrderTimeline>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderTimeline, Document<unknown, {}, OrderTimeline, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<OrderTimeline & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    order?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrderTimeline, Document<unknown, {}, OrderTimeline, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderTimeline & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<OrderStatus, OrderTimeline, Document<unknown, {}, OrderTimeline, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderTimeline & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    timestamp?: import("mongoose").SchemaDefinitionProperty<Date, OrderTimeline, Document<unknown, {}, OrderTimeline, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderTimeline & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    proofPhoto?: import("mongoose").SchemaDefinitionProperty<string | undefined, OrderTimeline, Document<unknown, {}, OrderTimeline, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<OrderTimeline & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderTimeline>;
