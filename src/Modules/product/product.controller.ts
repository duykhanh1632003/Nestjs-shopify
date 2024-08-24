import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Middleware/auth.guard';
import { ProductService } from './product.service';
import { NewProductDto } from 'src/Dto/product.dto';
import { Product } from '../database/schema/product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
    
  @Post('new')
  @UseGuards(AuthGuard)
  async createNewProduct(@Body() newProduct: NewProductDto): Promise<Product> {
    return this.productService.createNewProduct(newProduct);
  }
}
