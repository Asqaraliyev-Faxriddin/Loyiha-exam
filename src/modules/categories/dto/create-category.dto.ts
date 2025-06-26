import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    slug:string

    @IsString()
    @IsNotEmpty()
    description:string
}
