import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(ConfigService:ConfigService)=>({
                type:'mysql',
                host:ConfigService.getOrThrow('DB_HOST'),
                port:ConfigService.getOrThrow('DB_PORT'),
                username:ConfigService.getOrThrow('DB_USERNAME'),
                password:ConfigService.getOrThrow('DB_PASSWORD'),
                database:ConfigService.getOrThrow('DB_NAME'),
                entities:[UserEntity],
                synchronize:true

            })

        })
    ]
})
export class DatabaseModule {}
