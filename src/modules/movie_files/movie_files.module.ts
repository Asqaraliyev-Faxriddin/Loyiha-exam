import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { MovieFilesController } from './movie_files.controller';
import { MovieFile } from 'src/core/models/movie_files.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movies.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { User } from 'src/core/models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([MovieFile,Movie,UserSubscription,WatchHistory,User])],

  controllers: [MovieFilesController],
  providers: [MovieFilesService],
})
export class MovieFilesModule {}
