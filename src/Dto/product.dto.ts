import { IsArray, IsNotEmpty, MinLength, IsNumber, IsString } from 'class-validator';

export class NewProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @MinLength(10, {
    message: 'The description is too short',
  })
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsArray()
  images: string[];
}
