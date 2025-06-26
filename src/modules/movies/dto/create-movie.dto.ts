import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { subscriptionType } from 'src/core/types/user';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsEnum(subscriptionType)
  subscription_type: subscriptionType;

  @IsNotEmpty()
  @IsString()
  created_by: string;
}
