import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/core/models/payments.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { User } from 'src/core/models/user.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private paymentService:typeof Payment){}
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  async findAll() {
   let data = await this.paymentService.findAll({
    include:[
      {
        model:UserSubscription,
        include:[User]

      },
      {
        model:UserSubscription,
        include:[User,SubscriptionPlan]
      }
    ]
   })

   return data
  }

}
