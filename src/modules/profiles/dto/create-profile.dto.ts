import { IsNotEmpty, IsString, IsUUID, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;


  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
