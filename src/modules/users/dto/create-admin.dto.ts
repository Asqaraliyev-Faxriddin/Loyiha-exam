import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateAdminDto{
    
    @IsString()
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsEmail()
    email:string

}