import { Module } from '@nestjs/common';
import { SeaderService } from './seader.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { SubscriptionPlan } from '../models/subscription_plans.model';

@Module({
  imports:[SequelizeModule.forFeature([User,SubscriptionPlan])],
  providers: [SeaderService,]
})
export class SeaderModule {}
