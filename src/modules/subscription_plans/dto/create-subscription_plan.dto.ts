import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, IsJSON } from 'class-validator';

export class CreateSubscriptionPlanDto {

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  duration_days: number;

  @IsJSON()
  features: object;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
