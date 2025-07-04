import { Controller, Get, Post, Body, Patch, Req, Delete, UseGuards, Put, Param, ParseFloatPipe, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags("Favorite")
@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Post("create")
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Req() req: Request, @Body() createFavoriteDto: CreateFavoriteDto) {
    const user_id = req["user"].id;
    return this.favoritesService.create(createFavoriteDto ,user_id );
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Get('all')
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.favoritesService.findAll();
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Get("one")
  @UseGuards(AuthGuard, PermissionGuard)
  findOne(@Req() req: Request) {
    const user_id = req["user"].id;
    return this.favoritesService.findOne({ user_id });
  }

  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @Put("update/:id")
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Req() req: Request,@Param("id") id:string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @Delete("delete")
  @UseGuards(AuthGuard,)
  remove(@Req() req: Request) {
    const user_id = req["user"].id;
    return this.favoritesService.remove(user_id);
  }
}
