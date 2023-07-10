import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/user.schema'

@Module({
  imports: [ MongooseModule.forRoot('mongodb://127.0.0.1/nestjs-api'), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ], //registrar modulos
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {}
