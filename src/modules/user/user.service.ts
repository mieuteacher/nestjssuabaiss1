import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs'
@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    try {
      let users = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
      let createUserDtoTemp = {
        ...createUserDto,
        id: Math.random()
      }
      users.push(createUserDtoTemp);
      fs.writeFileSync('user.json', JSON.stringify(users));


      return {
        status: true,
        data: createUserDtoTemp,
        message: "Create ok!"
      }
    }catch(err) {
      return {
        status: false,
        data: null,
        message: "Lỗi model"
      }
    }
  }

  findAll() {
    try {
      let users = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
      return {
        status: true,
        data: users,
        message: "Ok!"
      }
    }catch(err) {
      return {
        status: false,
        data: null,
        message: "Lỗi Service"
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
