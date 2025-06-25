import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from 'src/core/models/favorites.model';
import { User } from 'src/core/models/user.model';
import { Movie } from 'src/core/models/movies.model';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite) private favoriteService:typeof Favorite){}
  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
