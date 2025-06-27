import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateReviewDto {
    
    @IsNotEmpty()
    movie_id:string

    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    comment:string
}
