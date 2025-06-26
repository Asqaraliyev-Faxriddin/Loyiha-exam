import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateFavoriteDto {

    @IsNotEmpty()
    @IsUUID()
    user_id:string

    
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
