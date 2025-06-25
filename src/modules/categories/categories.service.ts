import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/core/models/categories.model';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { Movie } from 'src/core/models/movies.model';
import { Model } from 'sequelize';
import { User } from 'src/core/models/user.model';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Review } from 'src/core/models/reviews.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryService:typeof Category){}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    return await this.categoryService.findAll({
      include: [
        {
          model: MovieCategory,
          include: [
            {
              model: Movie,
              include: [
                MovieFile,
                Review,
                {
                  model: User,
            
                }
              ]
            }
          ]
        }
      ]
    });
  }
  
  

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
