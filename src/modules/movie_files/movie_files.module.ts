import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { MovieFile } from 'src/core/models/movie_files.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movies.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([MovieFile,Movie,UserSubscription,WatchHistory,User,Permission])],

  controllers: [MovieFilesController],
  providers: [MovieFilesService,PermissionGuard],
})
export class MovieFilesModule {}
