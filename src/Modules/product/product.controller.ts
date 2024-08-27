import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../Middleware/auth.guard';
import { ProductService } from './product.service';
import { NewProductDto } from '../../Dto/product.dto';
import { Product } from '../database/schema/product.schema';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../Middleware/roles.guard';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

@Controller('product')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(TransformInterceptor)  // Áp dụng interceptor cho tất cả các phương thức trong controller
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('new')
  @Roles(Role.Admin, Role.SuperAdmin)
  async createNewProduct(@Body() newProduct: NewProductDto): Promise<Product> {
    return this.productService.createNewProduct(newProduct);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async findProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Get('search')
  @Roles(Role.Admin, Role.User)
  async searchProducts(@Query('query') query: string): Promise<{ list: Product[], count: number }> {
    const products = await this.productService.searchProducts(query);
    return {
      list: products,
      count: products.length
    };
  }

  @Get()
  @Roles(Role.Admin, Role.User)
  async getAllProducts(@Query('limit') limit: number, @Query('page') page: number): Promise<{ list: Product[], count: number }> {
    const products = await this.productService.getAllProducts(limit, page);
    const count = await this.productService.countAllProducts();
    return {
      list: products,
      count
    };
  }
}
