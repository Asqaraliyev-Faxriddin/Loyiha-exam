import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { UserSubscriptionsController } from './user_subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';

@Module({
  imports:[SequelizeModule.forFeature([UserSubscription])],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
})
export class UserSubscriptionsModule {}
