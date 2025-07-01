import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from 'src/core/models/payments.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model'; 
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Payment,
      UserSubscription ,
      SubscriptionPlan,
      Permission
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService,PermissionGuard],
})
export class PaymentsModule {}
