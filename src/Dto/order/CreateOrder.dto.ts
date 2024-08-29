import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  products: string[]; // Array of Product IDs

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(['pending', 'completed', 'cancelled'])
  status: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string; // Thêm userId

  @IsDate()
  createdAt: Date;
}
