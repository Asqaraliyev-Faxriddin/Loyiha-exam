import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from 'src/core/models/reviews.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([Review,User,Movie,Permission])],
  controllers: [ReviewsController],
  providers: [ReviewsService,PermissionGuard],
})
export class ReviewsModule {}
