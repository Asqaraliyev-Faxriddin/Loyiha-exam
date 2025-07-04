import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags("Review")
@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("create")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, )
  create(@Req() req:Request,@Body() createreviewDto: CreateReviewDto) {

    return this.reviewsService.create(createreviewDto,req["user"].id);
  }

  @Get("all")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  findOne(@Param('id') id: string ) {

    return this.reviewsService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
