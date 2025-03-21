import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({ imports: [ConfigModule.forRoot({
  isGlobal:true

  }),

  UserModule, DatabaseModule, AuthModule],
  
})
export class AppModule {}
