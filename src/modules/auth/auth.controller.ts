import { Body, Controller, Post } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto, VerifyDto } from './dto/auth.register.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
    @Post("register")
    register(@Body() payload:RegisterAuthDto){
        return this.authService.register(payload)
    }


    @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
    @Post("login")
    login(@Body() payload:LoginAuthDto){
        return this.authService.login(payload)
    }

    @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
    @Post("user-verify")
    UserVerify(@Body() payload:VerifyDto){
        return this.authService.verify(payload)
    }

}
