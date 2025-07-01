import { IsNotEmpty, IsString, IsUUID, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {

  @ApiProperty({ example: 'Faxriddin Asqaraliyev' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  full_name: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ example: 'Uzbekistan' })
  @IsOptional()
  @IsString()
  country?: string;
}
