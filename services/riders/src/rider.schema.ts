import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../shared/constants/roles.enum';

export type RiderDocument = Rider & Document;

@Schema()
export class Rider {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed

  @Prop({ type: String, enum: Role, default: Role.Rider })
  role: Role;

  @Prop({ default: 'offline' })
  status: 'online' | 'offline' | 'busy';

  @Prop({ default: [] })
  activeOrders: string[]; // store order ids

  @Prop({ type: Object, default: { lat: 0, lng: 0 } })
  location: { lat: number; lng: number };
}

export const RiderSchema = SchemaFactory.createForClass(Rider);
