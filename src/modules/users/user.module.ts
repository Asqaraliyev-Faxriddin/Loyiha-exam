import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { JwtModule } from '@nestjs/jwt';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
    
    SequelizeModule.forFeature([User,Permission])],
  controllers: [UserController],
  providers: [UserService,AuthGuard,PermissionGuard],
})
export class UserModule {}
