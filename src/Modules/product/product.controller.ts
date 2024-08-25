import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../Middleware/auth.guard';
import { ProductService } from './product.service';
import { NewProductDto } from '../../Dto/product.dto';
import { Product } from '../database/schema/product.schema';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../Middleware/roles.guard';

@Controller('product')
@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('new')
  @Roles(Role.Admin, Role.SuperAdmin)  // Cho phép truy cập nếu người dùng là Admin hoặc SuperAdmin
  async createNewProduct(@Body() newProduct: NewProductDto): Promise<Product> {
    return this.productService.createNewProduct(newProduct);
  }
  
  @Get(':id') 
  @Roles(Role.Admin, Role.User)  // Cho phép truy cập nếu người dùng là Admin hoặc User
  async findProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }
}
