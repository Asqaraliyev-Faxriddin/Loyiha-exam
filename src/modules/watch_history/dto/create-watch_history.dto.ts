import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateWatchHistoryDto {


@IsNotEmpty()
@IsString()
movie_id:string

@IsNotEmpty()
@IsNumber()
watched_duration: number

@IsNotEmpty()
@IsNumber()
watched_percentage: number


}
