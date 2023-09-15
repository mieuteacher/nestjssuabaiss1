import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      let newProduct = this.productRepository.create(createProductDto);
      const results = await this.productRepository.save(newProduct)
      
      return {
        status: true,
        data: results,
        message: "Create ok!"
      }
    }catch(err) {
      return {
        status: false,
        data: null,
        message: "Lỗi service"
      }
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      console.log("pagination", pagination)
      let products = await this.productRepository.find({
        skip: pagination.skip,
        take: pagination.take
      });
      
      return {
        status: true,
        data: products,
        message: "Get products ok!"
      }
    }catch(err) {
      return {
        status: false,
        data: null,
        message: "Lỗi service"
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
