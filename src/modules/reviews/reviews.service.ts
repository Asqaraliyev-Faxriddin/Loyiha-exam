import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from 'src/core/models/reviews.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewService:typeof Review){}
  create(createReviewDto: CreateReviewDto) {
    
    return 'This action adds a new review';
  }

  async findAll() {
    let data = await this.reviewService.findAll({
      include:[
        {
          model:User
        },
        {
          model:Movie
        }
      ]
    })
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
