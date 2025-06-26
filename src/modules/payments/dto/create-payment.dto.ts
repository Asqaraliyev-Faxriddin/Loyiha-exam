import { IsEnum, IsNotEmpty, IsUUID, IsNumber, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from 'src/core/types/user';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  user_subscription_id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsNotEmpty()
  payment_details: object;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsString()
  external_transaction_id: string;
}
