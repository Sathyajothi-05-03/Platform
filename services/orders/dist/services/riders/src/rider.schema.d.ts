import { Document } from 'mongoose';
import { Role } from '../../shared/constants/roles.enum';
export type RiderDocument = Rider & Document;
export declare class Rider {
    name: string;
    email: string;
    password: string;
    role: Role;
    status: 'online' | 'offline' | 'busy';
    activeOrders: string[];
    location: {
        lat: number;
        lng: number;
    };
}
export declare const RiderSchema: import("mongoose").Schema<Rider, import("mongoose").Model<Rider, any, any, any, any, any, Rider>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rider, Document<unknown, {}, Rider, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<Role, Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"offline" | "online" | "busy", Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    activeOrders?: import("mongoose").SchemaDefinitionProperty<string[], Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<{
        lat: number;
        lng: number;
    }, Rider, Document<unknown, {}, Rider, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Rider & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Rider>;
