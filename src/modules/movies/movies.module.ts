import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Movie } from 'src/core/models/movies.model'; 
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Category } from 'src/core/models/categories.model';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      MovieFile,
      Movie,
      Category,
      User,
      Permission
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService,PermissionGuard],
})
export class MoviesModule {}
