import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@ApiTags("Category")
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Post('create')
  @UseGuards(AuthGuard, PermissionGuard)
  create( @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @Get('all')
  @UseGuards(AuthGuard, )
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @Get('one')
  @UseGuards(AuthGuard, )
  findOne(@Query() payload: any,) {
    return this.categoriesService.findOne(payload);
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Put('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Req() req: Request,@Param('id', ParseIntPipe) id: number,@Body() updateCategoryDto: UpdateCategoryDto,) {

    return this.categoriesService.update(id,updateCategoryDto);
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Delete('delete/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  remove( @Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
