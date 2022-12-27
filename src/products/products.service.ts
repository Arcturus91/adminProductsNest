import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

//import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productCreated = await this.productModel.create(createProductDto);
    return productCreated;
  }

  async findAll() {
    const list = await this.productModel.find({});
    return list;
  }

  async findOne(id: string) {
    const product = await this.findProduct(id);

    return {
      id: product._id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      slug: product.slug,
      status: product.status,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.findProduct(id);

    if (updateProductDto.name) {
      updatedProduct.name = updateProductDto.name;
    }

    if (updateProductDto.category) {
      Object.assign(updatedProduct.category, updateProductDto.category);

      /* const name = updateProductDto.category['name'];
      const slug = updateProductDto.category['slug'];
      console.log(name, slug, updatedProduct.category.name);
      updatedProduct.category.name = name;
      updatedProduct.category.slug = slug; */
    }

    if (updateProductDto.brand) {
      const name = updateProductDto.brand['name'];
      const slug = updateProductDto.brand['slug'];
      console.log(name, slug, updatedProduct.brand.name);
      updatedProduct.brand['name'] = name;
      updatedProduct.brand['slug'] = slug;
    }

    if (updateProductDto.slug) {
      updatedProduct.slug = updateProductDto.slug;
    }

    if (updateProductDto.status) {
      updatedProduct.status = updateProductDto.status;
    }

    updatedProduct.save();

    return `Product #${id} updated`;
  }

  async remove(id: string) {
    const result = await this.productModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Element not found');
    }

    return `Product #${id} deleted`;
  }

  private async findProduct(id: string): Promise<ProductDocument> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (e) {
      throw new NotFoundException('could not find ID');
    }

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }
}
