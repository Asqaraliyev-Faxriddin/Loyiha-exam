import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, PermissionDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserRole } from 'src/core/types/user';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { ApiBearerAuth, ApiBody, ApiProperty } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("create/permission/:admin_id")
  @ApiBody({type:PermissionDto})
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createAdminDto: Required<PermissionDto>,@Param("admin_id") id:string) {
    return this.adminService.create(id,createAdminDto);
  }

  @Get("permission/all")
  @UseGuards(AuthGuard, PermissionGuard)

  findAll() {
    return this.adminService.findAll();
  }

  @Get('one/permision/:id')
  @UseGuards(AuthGuard, PermissionGuard)

  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put('update/permision/:id')
  @UseGuards(AuthGuard, PermissionGuard)

  update(@Param('id') id: string, @Body() updateAdminDto: PermissionDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('delete/permision/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }


  @Get("/admin/all")
  @UseGuards(AuthGuard, PermissionGuard)
  AdminAll(){

      return this.adminService.AdminAll()
  }

  @Post("/create/add/admin")
  @UseGuards(AuthGuard, PermissionGuard)
  AddAdmin(@Body() payload:CreateAdminDto){
      return this.adminService.AddAdmin(payload)
  }

  @Put("/update/admin")
  @UseGuards(AuthGuard, PermissionGuard)
  UpdateAdmin(@Body() payload:Required<UpdateAdminDto>,@Req() req:Request){
    let id = req["user"].id
      return this.adminService.updateAdmin(id,payload)
  }


  @Delete("/delete/admin/:id")
  @UseGuards(AuthGuard, PermissionGuard)
  DeleteAdmin(@Param("id") id:string){

      return this.adminService.deleteAdmin(id)
  }


}
