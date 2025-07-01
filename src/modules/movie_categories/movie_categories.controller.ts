import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { PermissionGuard,  } from 'src/core/guards/role-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("Movie Category")
@Controller('api/movie-categories')
export class MovieCategoriesController {
  constructor(private readonly movieCategoriesService: MovieCategoriesService) {}

  @Post()
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.movieCategoriesService.create(createMovieCategoryDto);
  }

  @Get("all")
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.movieCategoriesService.findAll();
  }

  @Get('one')
  findOne(@Param('id') id: string) {
    return this.movieCategoriesService.findOne({ id });
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateMovieCategoryDto: UpdateMovieCategoryDto) {
    return this.movieCategoriesService.update(id, updateMovieCategoryDto);
  }

  @Delete('update/:id')
  @UseGuards(AuthGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.movieCategoriesService.remove(id);
  }
}
