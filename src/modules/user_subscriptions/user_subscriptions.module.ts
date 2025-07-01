import { Global, Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { UserSubscriptionsController } from './user_subscriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { SubscriptionPlansService } from '../subscription_plans/subscription_plans.service';
import { SubscriptionPlansModule } from '../subscription_plans/subscription_plans.module';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Global()
@Module({
  imports:[SequelizeModule.forFeature([UserSubscription,User ,Permission ,SubscriptionPlan]),

  SubscriptionPlansModule
]
  ,
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService,PermissionGuard],
})
export class UserSubscriptionsModule {}
