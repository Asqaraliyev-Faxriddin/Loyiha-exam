
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { SubscriptionPlan } from "./subscription_plans.model";
import {UserSubscriptionStatus } from "../types/user";
import { Payment } from "./payments.model";

@Table({ tableName: 'user_subscriptions' })
export class UserSubscription extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => SubscriptionPlan)
  @Column(DataType.UUID)
  plan_id: string;

  @Default(DataType.NOW)
  @Column(DataType.DATE)
  start_date: Date;

  @Column(DataType.DATE)
  end_date: Date;

  @Default('pending_payment')
  @Column({type:DataType.ENUM(...Object.values(UserSubscriptionStatus))})
  status: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  auto_renew: boolean;

  @BelongsTo(() => User,{
    foreignKey:"user_id",
    onDelete:"CASCADE"
  })
  users: User;

  @BelongsTo(() => SubscriptionPlan,{
    foreignKey:"user_subscription_id",
    onDelete:"CASCADE"
  })
  subscriptionplan  : SubscriptionPlan;

  @HasMany(()=>Payment, {
    foreignKey: 'plan_id',   
    onDelete: 'CASCADE'                   
  })
  payment:Payment


}