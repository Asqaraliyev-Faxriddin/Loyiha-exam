import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags("Review")
@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("create")
  @UseGuards(AuthGuard, )
  create(@Req() req:Request,@Body() createreviewDto: CreateReviewDto) {

    return this.reviewsService.create(createreviewDto,req["user"].id);
  }

  @Get("all")
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('one/:id')
  @UseGuards(AuthGuard, )
  findOne(@Param('id') id: string ) {

    return this.reviewsService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard, )
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, )
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
