import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async createUser(@Body() dto:CreateUserDto) {
    return  await this. UserService.createUser(dto)
  }

  // @Get('getuser')
  // async getAllData(): Promise<UserEntity[]> {
  //   return this.UserService.getAllData();
  // }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return this.UserService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<UserEntity>) {
    return  await this.UserService.update(id, updateData);
  }


  @Put('block/:id')
async blockUser(@Param('id') userId:string, @Body('block') block: boolean) {
  return this.UserService.blockUser(String(userId), block);
}


  @Delete(':id')
  async delete(@Param('id') id:number) {
    return this.UserService.remove(id);
  }
}
