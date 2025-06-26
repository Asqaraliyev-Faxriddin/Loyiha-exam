import { IsNotEmpty, IsUUID } from "class-validator"

export class UpdateFavoriteDto {


    
    @IsNotEmpty()
    @IsUUID()
    movie_id:string
}
