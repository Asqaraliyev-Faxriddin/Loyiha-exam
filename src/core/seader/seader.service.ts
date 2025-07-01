import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { SubscriptionPlan } from "../models/subscription_plans.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class SeaderService implements OnModuleInit {
  private logger = new Logger("SeaderService");

  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(SubscriptionPlan) private subscriptionPlanModel: typeof SubscriptionPlan,
  ) {}

  onModuleInit() {
    this.seed();
  }

  async seed() {
    await this.seedSuperAdmin();
    await this.seaderplanFree();
  }

  private async seedSuperAdmin() {
    let existingUser = await this.userModel.findOne({
      where: { username: "Faxriddin" },
    });

    if (!existingUser) {
      let password = await bcrypt.hash("12345678", 10);

      await this.userModel.create({
        username: "Faxriddin",
        email: "asqaraliyevfaxriddin2011@gmail.com",
        password,
        role: "SUPERADMIN",
      });

      this.logger.log("SuperAdmin yaratildi");
    } else {
      this.logger.log("SuperAdmin allaqachon mavjud");
    }
  }

  private async seaderplanFree() {
    let default_id = '88888888-0000-0000-0000-000000000001';
  
    let freePlan = await this.subscriptionPlanModel.findByPk(default_id);
  
    if (!freePlan) {
      freePlan = await this.subscriptionPlanModel.create({
        id: default_id, 
        name: "Free Plan",
        price: 0,
        duration_days: 30,
        features: JSON.stringify(["Limited access"]),
        is_active: true,
      });
  
      this.logger.log("Free Plan yaratildi");
    } else {
      this.logger.log("Free Plan allaqachon mavjud");
    }
  
    return freePlan.id;
  }
  
}
