import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsEnum,IsOptional } from "class-validator";
import { subscriptionType } from "src/core/types/user";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";


export class CreateMovieDto {

  @ApiProperty({ example: "Inception"})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "inception-2010",})
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: "Bu film orzular ichiga kirib borish haqida."})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 2010, })
  @IsNotEmpty()
  @IsNumber()
  release_year: number;

  @ApiProperty({ example: 148,})
  @IsNotEmpty()
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 8.8,  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({ example: "premium"})
  @IsNotEmpty()
  @IsEnum(subscriptionType)
  subscription_type: subscriptionType;

  @ApiProperty({ example: "dc0f31a0-8f12-4cf4-91cb-2e68b92f4a89",  })
  @IsNotEmpty()
  @IsString()
  created_by: string;
}





export class MovieQueryDto {
  @ApiPropertyOptional({ example: "Qasoskorlar", description: "Film nomi boyicha qidiruv" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 1, description: "Nechinchi sahifa" })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ example: 20, description: "Nechta natija chiqarilsin" })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({ example: "free" ,description: "Obuna turi" })
  @IsOptional()
  @IsEnum(subscriptionType)
  subscription_type?: string;
}
