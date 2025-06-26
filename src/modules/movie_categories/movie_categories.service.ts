import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie_categories.model';
import { Category } from 'src/core/models/categories.model';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';


@Injectable()
export class MovieCategoriesService {
  constructor(@InjectModel(MovieCategory) private movieCategoryService:typeof MovieCategory){}
  

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
  async create(payload: Required<CreateMovieCategoryDto>) {
    
    let data = await this.movieCategoryService.create(payload)

    return data
  }


  async findOne(payload: any) {
    const allowedFields = ['id', 'category_id', 'movie_id'];

    for (const key in payload) {
    // @ts-ignore
      if (!allowedFields.includes(key)) {
        throw new ConflictException(`Noto'g'ri ustun ${key}`);
      }
    let data = await this.movieCategoryService.findAll({
      where: {
        ...payload
      }

    })

    return data
  }
}

  async update(id: number, updateCategoryDto: UpdateMovieCategoryDto) {

    let data = await this.movieCategoryService.findOne({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      let categoryUpdate = await this.movieCategoryService.update(updateCategoryDto,{where:{id}})

    return {
      message:"Malumot o'zgartirildi.",
      data:categoryUpdate 
    }
  }
  

  async remove(id: number) {
     let data =await this.movieCategoryService.destroy({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      return "Category o'chirildi."

  }

}
