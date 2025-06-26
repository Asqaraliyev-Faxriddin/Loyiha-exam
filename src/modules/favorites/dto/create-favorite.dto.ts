import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateFavoriteDto {


    
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
