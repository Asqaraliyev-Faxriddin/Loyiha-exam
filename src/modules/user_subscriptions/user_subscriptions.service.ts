import { Injectable } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { User } from 'src/core/models/user.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';

@Injectable()
export class UserSubscriptionsService {
  constructor(@InjectModel(UserSubscription) private userSubcription:typeof UserSubscription){}
  create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
    return 'This action adds a new userSubscription';
  }

  async findAll() {
    let data = await this.userSubcription.findAll({
      include:[
        {
          model:User
        },
        {
          model:SubscriptionPlan
        }
      ]
    })

    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} userSubscription`;
  }

  update(id: number, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return `This action updates a #${id} userSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSubscription`;
  }
}
