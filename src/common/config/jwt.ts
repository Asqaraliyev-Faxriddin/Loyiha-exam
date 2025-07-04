import {JwtSignOptions } from "@nestjs/jwt";

export const JwtAccesToken:JwtSignOptions = {
    secret:"dssssssd",
    expiresIn:"40m"
}

export const JwtRefreshToken:JwtSignOptions = {
    secret:"process.env.Jwt_Ref",
    expiresIn:"20m"
}


