import { Module } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { MovieCategoriesController } from './movie_categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([MovieCategory,Permission])],

  controllers: [MovieCategoriesController],
  providers: [MovieCategoriesService,PermissionGuard],
})
export class MovieCategoriesModule {}
