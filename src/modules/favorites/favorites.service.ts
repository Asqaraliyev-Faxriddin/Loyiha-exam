import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from 'src/core/models/favorites.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteService:typeof Favorite){}


  async findAll() {
     let data =await this.favoriteService.findAll({include:[
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

  async create(payload: Required<CreateFavoriteDto>) {
    
    let data = await this.favoriteService.create(payload)

    return data
  }


  async findOne(payload: any) {
    const allowedFields = ['id', 'user_id', 'movie_id'];

    for (const key in payload) {
    // @ts-ignore
      if (!allowedFields.includes(key)) {
        throw new ConflictException(`Noto'g'ri ustun ${key}`);
      }
    let data = await this.favoriteService.findAll({
      where: {
        ...payload
      }

    })

    return data
  }
}

  async update(id: number, updateCategoryDto: UpdateFavoriteDto) {

    let data = await this.favoriteService.findOne({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      let categoryUpdate = await this.favoriteService.update(updateCategoryDto,{where:{id}})

    return {
      message:"Malumot o'zgartirildi.",
      data:categoryUpdate 
    }
  }
  

  async remove(id: number) {
     let data =await this.favoriteService.destroy({
      where: {
        id
      }

    })
    if(!data) throw new NotFoundException("user not found ")

      return "favorite o'chirildi."

  }

}
