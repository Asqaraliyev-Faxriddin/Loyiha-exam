import { Injectable } from '@nestjs/common';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { Model } from 'sequelize';
import { Category } from 'src/core/models/categories.model';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class MovieCategoriesService {
  constructor(@InjectModel(MovieCategory) private movieCategoryService:typeof MovieCategory){}
  create(createMovieCategoryDto: CreateMovieCategoryDto) {
    return 'This action adds a new movieCategory';
  }

  async findAll() {
    let data = this.movieCategoryService.findAll({
      include:[{
        model:Category
      },
      {
        model:Movie,
        include:[User]
      }
      ]
    })
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} movieCategory`;
  }

  update(id: number, updateMovieCategoryDto: UpdateMovieCategoryDto) {
    return `This action updates a #${id} movieCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieCategory`;
  }
}
