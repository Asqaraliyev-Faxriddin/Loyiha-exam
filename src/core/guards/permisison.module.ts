import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/core/models/permission.model';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from './role-guard';

@Global()
@Module({
  imports:[SequelizeModule.forFeature([Permission,User])],
  providers: [PermissionGuard],
  exports:[PermissionGuard]
})
export class PermissionModule {}
