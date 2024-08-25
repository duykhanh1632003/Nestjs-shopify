import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewProductDto } from '../../Dto/product.dto';
import { Product, ProductDocument } from '../database/schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createNewProduct(newProduct: NewProductDto): Promise<Product> {
    const product = await this.productModel.create(newProduct);
    if (!product) {
      throw new BadRequestException('Cannot create product');
    }
    return product;
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
