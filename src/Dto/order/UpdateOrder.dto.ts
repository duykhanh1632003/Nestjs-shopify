import { IsArray, IsEnum, IsOptional, IsString, IsNumber, IsMongoId } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsArray()
  products?: string[];

  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsMongoId()
  userId?: string; // Thêm userId nếu cần cập nhật
}
