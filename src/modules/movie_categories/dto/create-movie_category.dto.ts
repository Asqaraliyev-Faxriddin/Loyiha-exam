import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateMovieCategoryDto {

    @IsUUID()
    @IsNotEmpty()
    category_id:string

    @IsUUID()
    @IsNotEmpty()
    movie_id:string
}
