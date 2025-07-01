import { Module } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription_plans.service';
import { SubscriptionPlansController } from './subscription_plans.controller';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([SubscriptionPlan,Permission])],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService,PermissionGuard],
  exports: [SubscriptionPlansService,],
})
export class SubscriptionPlansModule {}
