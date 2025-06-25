import { IsEmail, IsJWT, IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterAuthDto{

    @IsNotEmpty()
    @Length(3,40)
    @IsString()
    username:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    @Length(6,25)
    password:string
}

export class LoginAuthDto{


    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    @IsString()
    @Length(6,25)
    password:string
}

export class TokenDto { 

    @IsNotEmpty()
    @IsJWT()
    token:string
}

export class VerifyDto { 

    @IsNotEmpty()
    code:number

    @IsNotEmpty()
    @IsEmail()
    email:string
}