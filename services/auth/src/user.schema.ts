import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '@shared/constants/roles.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // hashed password

  @Prop({ required: true, enum: Role, default: Role.Client })
  role: Role;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
