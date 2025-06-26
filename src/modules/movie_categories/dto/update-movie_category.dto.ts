import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateMovieCategoryDto  {
    @IsUUID()
    @IsNotEmpty()
    category_id:string

    @IsUUID()
    @IsNotEmpty()
    movie_id:string
}
