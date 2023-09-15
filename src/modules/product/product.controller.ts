import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, Query, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import {Response} from 'express'
import { PaginationDto } from './dto/pagination.dto';
@ApiTags('products')

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    try {
      let serviceRes = await this.productService.create(createProductDto);
      res.statusMessage = serviceRes.message;
      return res.status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED).json(serviceRes.data)
    }catch(err) {
      throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Res() res: Response,@Query('skip', ParseIntPipe) skip: number, @Query('take', ParseIntPipe) take: number) {
    try {
      let pagination:PaginationDto = {
        skip,
        take
      }
      let serviceRes = await this.productService.findAll(pagination);
      res.statusMessage = serviceRes.message;
      return res.status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED).json(serviceRes.data)
    }catch(err) {
      throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
