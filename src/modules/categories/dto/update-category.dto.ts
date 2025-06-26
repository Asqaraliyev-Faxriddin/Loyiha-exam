import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto{

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    slug:string

    @IsString()
    @IsNotEmpty()
    description:string
}
