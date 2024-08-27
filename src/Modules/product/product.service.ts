import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewProductDto } from '../../Dto/product.dto';
import { Product, ProductDocument } from '../database/schema/product.schema';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // Import đúng `Cache` từ `cache-manager`

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // Inject đúng `Cache`
  ) { }

  @CacheKey('products_list') // Key cho cache
  @CacheTTL(60) // TTL cho cache
  async createNewProduct(newProduct: NewProductDto): Promise<Product> {
    const product = await this.productModel.create(newProduct);
    if (!product) {
      throw new BadRequestException('Cannot create product');
    }
    return product;
  }

  async findProductById(id: string): Promise<Product> {
    const cacheProduct = await this.cacheManager.get<Product>(`product_${id}`);
    if (cacheProduct) {
      return cacheProduct;
    }
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.cacheManager.set(`product_${id}`, product); // Sử dụng `set` từ `cacheManager`

    return product;
  }

  async getAllProducts(limit: number, page: number): Promise<Product[]> {
    const skip = limit * (page - 1);
    return this.productModel.find().skip(skip).limit(limit).exec();
  }

  async countAllProducts(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productModel.find({ name: { $regex: query, $options: 'i' } }).exec();
  }
}
