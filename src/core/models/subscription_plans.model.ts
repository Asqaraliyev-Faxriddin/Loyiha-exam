import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({tableName:"subscription_plans"})
export class SubscriptionPlan extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
  
    @Column(DataType.STRING)
    name: string;
  
    @Column(DataType.DECIMAL(10, 2))
    price: number;
  
    @Column(DataType.INTEGER)
    duration_days: number;
  
    @Column(DataType.JSON)
    features: object;
  
    @Default(true)
    @Column(DataType.BOOLEAN)
    is_active: boolean;
  }