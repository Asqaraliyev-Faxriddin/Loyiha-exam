import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCategoryDto {
    @ApiProperty({example:"Action"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:"Zo'r"})
    @IsNotEmpty()
    slug:string

    @ApiProperty({example:"Alo"})
    @IsString()
    @IsNotEmpty()
    description:string
}
