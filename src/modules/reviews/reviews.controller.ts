import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Req() req:Request,@Body() createreviewDto: CreateReviewDto) {

    return this.reviewsService.create(createreviewDto,req["user"].id);
  }

  @Get("all")
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
