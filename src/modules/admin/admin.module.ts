import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/core/models/permission.model';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from 'src/core/guards/role-guard';

@Module({
  imports:[SequelizeModule.forFeature([Permission,User])],
  controllers: [AdminController],
  providers: [AdminService,PermissionGuard],
})
export class AdminModule {}
