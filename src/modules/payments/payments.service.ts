import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/core/models/payments.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import { User } from 'src/core/models/user.model';
import { SubscriptionPlan } from 'src/core/models/subscription_plans.model';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    @InjectModel(UserSubscription) private userSubscriptionModel: typeof UserSubscription,
    @InjectModel(SubscriptionPlan) private planModel: typeof SubscriptionPlan,
  ) {}

  async create(payload: Required<CreatePaymentDto>) {
    let subscription = await this.userSubscriptionModel.findOne({
      where: { id: payload.user_subscription_id },
      include: [SubscriptionPlan],
    });


      if (!subscription) {
        throw new ConflictException("Bunday user_subscription mavjud emas");
    } 


    let planPrice = subscription.subscriptionplan?.price

    if (!planPrice) {
      throw new ConflictException("Obunani  narxi topilmadi");
    }


    if (Number(payload.amount) !== Number(planPrice)) {
      throw new ConflictException("To'lov summasi noto'g'ri kiritilgan");
    }

    await this.userSubscriptionModel.update(
      { status: "active" },
      { where: { id: payload.user_subscription_id } }
    );

    let payment = await this.paymentModel.create(payload);

    return {
      message: "To'lov muvaffaqiyatli qo'shildi",
      data: payment
    };
  }

  async findAll() {
    let data = await this.paymentModel.findAll({
      include: [
        {
          model: UserSubscription,
          include: [User, SubscriptionPlan],
        },
      ],
    });

    return data;
  }
}
