import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID, IsJSON } from 'class-validator';

export class UpdateSubscriptionPlanDto {

    @ApiProperty({ example: 'Premium 1 oylik' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 25000 })
    @IsNumber()
    price: number;
  
    @ApiProperty({ example: 30 })
    @IsNumber()
    duration_days: number;
  
    @ApiProperty({ example: { resolution: "1080p", download: true, multi_device: true } })
    @IsJSON()
    features: object;
  
    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}


