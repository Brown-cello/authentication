import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('createuser')
  async createUser(@Body() dto:CreateUserDto): Promise<UserEntity> {
    return  await this. UserService.createUser(dto)
  }

  // @Get('getuser')
  // async getAllData(): Promise<UserEntity[]> {
  //   return this.UserService.getAllData();
  // }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<UserEntity> {
    return this.UserService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<UserEntity>) {
    return  await this.UserService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.UserService.remove(id);
  }
}
