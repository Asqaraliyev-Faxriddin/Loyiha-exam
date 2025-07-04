import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, PermissionDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UserRole } from 'src/core/types/user';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Post("create/permission/:admin_id")
  @ApiBody({type:PermissionDto})
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createAdminDto: Required<PermissionDto>,@Param("admin_id") id:string) {
    return this.adminService.create(id,createAdminDto);
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Get("permission/all")
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Get('one/permision/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  @Put('update/permision/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: PermissionDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  @Delete('delete/permision/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }


  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Get("/admin/all")
  @UseGuards(AuthGuard, PermissionGuard)
  AdminAll(){

      return this.adminService.AdminAll()
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Post("/create/add/admin")
  @UseGuards(AuthGuard, PermissionGuard)
  AddAdmin(@Body() payload:CreateAdminDto){
      return this.adminService.AddAdmin(payload)
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Put("/update/admin")
  @UseGuards(AuthGuard, PermissionGuard)
  UpdateAdmin(@Body() payload:Required<UpdateAdminDto>,@Req() req:Request){
    let id = req["user"].id
      return this.adminService.updateAdmin(id,payload)
  }


  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Delete("/delete/admin/:id")
  @UseGuards(AuthGuard, PermissionGuard)
  DeleteAdmin(@Param("id") id:string){

      return this.adminService.deleteAdmin(id)
  }


}
