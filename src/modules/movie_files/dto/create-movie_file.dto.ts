import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { MovieQuality } from "src/core/types/user";

export class CreateMovieFileDto {

    @IsUUID()
    id:string

    @IsNotEmpty()
    movie_id:string

    @IsNotEmpty()
    @IsEnum(MovieQuality)
    quality:MovieQuality
}
