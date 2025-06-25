import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieService:typeof Movie){}
  create(createMovieDto: CreateMovieDto) {
   
  }

  findAll() {
 
    let data = this.movieService.findAll({
      include:[{
        model:Movie,
        include:[User]
      }
      ]
    })
  }

  findOne(id: number) {

  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
