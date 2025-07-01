import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from 'src/core/models/favorites.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([Favorite,User,Movie,Permission])],
  controllers: [FavoritesController],
  providers: [FavoritesService,PermissionGuard],
})
export class FavoritesModule {}
