import { IsNotEmpty, IsUUID } from "class-validator"

export class UpdateFavoriteDto {

    @IsNotEmpty()
    @IsUUID()
    user_id:string

    
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
