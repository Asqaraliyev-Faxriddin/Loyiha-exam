import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@ApiTags("Category")
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @UseGuards(AuthGuard, PermissionGuard)
  create( @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('all')
  @UseGuards(AuthGuard, )
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('one')
  @UseGuards(AuthGuard, )
  findOne(@Query() payload: any,) {
    return this.categoriesService.findOne(payload);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Req() req: Request,@Param('id', ParseIntPipe) id: number,@Body() updateCategoryDto: UpdateCategoryDto,) {

    return this.categoriesService.update(id,updateCategoryDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  remove( @Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
