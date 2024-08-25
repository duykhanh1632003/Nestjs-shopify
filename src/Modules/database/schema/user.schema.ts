import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], enum: Role, default: [Role.User] })
  roles: Role[];
} 

export const UserSchema = SchemaFactory.createForClass(User);
