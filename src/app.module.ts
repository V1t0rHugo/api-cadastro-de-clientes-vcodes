import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL), 
    ClientsModule, 
    UsersModule, 
    AuthModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
