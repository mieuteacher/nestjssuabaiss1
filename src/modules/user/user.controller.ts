import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ForbiddenException, BadRequestException, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserDto } from './dto/find-user.dto';
import axios from 'axios';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UsePipes(new ValidationPipe())
  @ApiResponse({ 
    status: 200, 
    description: 'New user', 
    type: CreateUserDto,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {type: "string"},
        email: {type: "string"}
      },
      example:
       {
        name: "exampleName",
        email: "example@gmail.com"
      }
    }
  })
  @ApiResponse({ status: 202, description: 'Tạo thất bại!'})
  @ApiResponse({ status: 500, description: 'Lỗi call apis'})
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    console.log("createUserDto", createUserDto)
    try {
      let serviceRes = this.userService.create(createUserDto);
      res.statusMessage = serviceRes.message;
      return res.status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED).json(serviceRes.data)
    }catch(err) {
      throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách toàn bộ người dùng!', 
    type: FindUserDto,
    isArray: true
  })
  @ApiResponse({ status: 202, description: 'Lấy danh sách người dùng thất bại!'})
  @ApiResponse({ status: 500, description: 'Lỗi call apis'})
  findAll(@Res() res: Response) {
      try {
        let serviceRes = this.userService.findAll();
        res.statusMessage = serviceRes.message;
        return res.status(serviceRes.status ? HttpStatus.OK : HttpStatus.ACCEPTED).json(serviceRes.data);
      } catch (error) {
        throw new HttpException('Lỗi xử lý yêu cầu', HttpStatus.BAD_REQUEST);
      }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
