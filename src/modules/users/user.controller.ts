import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { PermissionGuard } from 'src/core/guards/role-guard';

import { UserRole } from 'src/core/types/user';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("User")
@Controller('api')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("users")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
    @UseGuards(AuthGuard,PermissionGuard)
    getAllUsers(){
        return this.userService.findAll()
    }


    @Delete("user/delete")
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
    @UseGuards(AuthGuard, )
    delete(@Req() req :Request){
        let id = req["user"].id
        return this.userService.delete(id)
    }

    
    @Put("user/update")
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
    @UseGuards(AuthGuard, )
    update(@Req() req :Request,@Body() payload:CreateAdminDto){
        let id = req["user"].id

        return this.userService.update(payload,id)
    }


}
