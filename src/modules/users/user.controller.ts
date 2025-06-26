import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { RolesGuard } from 'src/core/guards/role-guard';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserRole } from 'src/core/types/user';

@Controller('api')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("users")
    @Roles(UserRole.Admin,UserRole.SuperAdmin)
    @UseGuards(AuthGuard,RolesGuard)
    getAllUsers(){
        return this.userService.findAll()
    }

}
