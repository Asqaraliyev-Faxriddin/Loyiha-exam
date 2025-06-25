import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
