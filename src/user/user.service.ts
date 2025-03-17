import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity )
    private userRepository:Repository<UserEntity >,
  ){}

  async createUser(dto:CreateUserDto): Promise<UserEntity>{
    const newCar = await this.userRepository.create(dto);
    return this.userRepository.save(newCar)
  }
  // async getAllData(): Promise<UserEntity[]>{
  //   return this.userRepository.find()
  // }


  async findOneById(id: number, ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });


    
    if (!user) {
      throw new NotFoundException(`data record with ID ${id} not found`);
    }
    return user;

    



    
      }


      async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { username } });
    }
    
    async findByPassword(password: string): Promise<UserEntity | null> {
      return await this.userRepository.findOne({ where: { password } });
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
