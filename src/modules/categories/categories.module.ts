import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/core/models/categories.model';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { AuthModule } from '../auth/auth.module';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([Category,Permission]),AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService,AuthGuard,PermissionGuard],
})
export class CategoriesModule {}
