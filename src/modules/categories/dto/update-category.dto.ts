import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto{

    @ApiProperty({example:"Jangovar"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:"Qo'rqinchli"})
    @IsNotEmpty()
    slug:string

    @ApiProperty({example:"zo'r"})
    @IsString()
    @IsNotEmpty()
    description:string
}
