import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';
import { User } from './user.schema'; // Import User schema

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  orderId: string;

  @Prop({ type: [{ type: Object, ref: 'Product' }], required: true })
  products: Product[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ enum: ['pending', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Thêm userId
  userId: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
