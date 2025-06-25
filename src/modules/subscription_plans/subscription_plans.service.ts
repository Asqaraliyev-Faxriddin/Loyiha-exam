import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription_plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription_plan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';

@Injectable()
export class SubscriptionPlansService {
  constructor(@InjectModel(SubscriptionPlan)private subcriptionPlanService:typeof SubscriptionPlan){}
  create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return 'This action adds a new subscriptionPlan';
  }

  findAll() {
    let data = this.subcriptionPlanService.findAll({
      include:[
        {
          model:UserSubscription
        }
      ]
    })

    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionPlan`;
  }

  update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return `This action updates a #${id} subscriptionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionPlan`;
  }
}
