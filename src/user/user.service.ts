import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity )
    private userRepository:Repository<UserEntity >,
    private jwtService:JwtService
  ){}

  async createUser(dto:CreateUserDto){
    const user = this.findByEmail(dto.email)
    if(await user){
      throw new BadRequestException('email already exists')
    }


    const salt = await bcrypt.genSalt(10);
    dto.password = await bcrypt.hash(dto.password, salt);

const payload = { sub: 'user.id', email: 'user.email' };
    const newCar = await this.userRepository.create(dto);
    return{
     userDetails : await this.userRepository.save(newCar),
     access_token: await this.jwtService.signAsync(payload),
    }
  }
  // async getAllData(): Promise<UserEntity[]>{
  //   return this.userRepository.find()
  // }


  async findOneById(id: string, ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });


    
    if (!user) {
      throw new NotFoundException(`data record with ID ${id} not found`);
    }
    return user;

    



    
      }
    
    
    async findByPassword(password: string): Promise<UserEntity | null> {
      return await this.userRepository.findOne({ where: { password } });
  }

  async findByEmail(email: string){
    const emailexist= await this.userRepository.findOne({ where: { email} });
    // if(!emailexist){
    //   throw new BadRequestException(' no email exist');
      
    
    // }
    return emailexist
}












  
  
    


      async update(id, updatedata: Partial<UserEntity>) {
        const updateuser = await this.userRepository.findOne({ where: { id } });
    
        if (!updateuser) {
          throw new NotFoundException(`Library record with ID ${id} not found`);
        }
    
        const newupdatecar = await this.userRepository.update(id,updateuser);
        const updated = await this.userRepository.findOne({ where: { id } })
        

        return{
          statuscode:200,
          message:'link succesfully updated',
          data:updated
        }
}


async remove(id: number): Promise<{ message: string }> {
  const result = await this.userRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(`Library record with ID ${id} not found`);
  
  }

  const newresult= await this.userRepository.delete(id)
  

  return { message: `Library record with ID ${id} deleted successfully`,


};
} 
  



}
