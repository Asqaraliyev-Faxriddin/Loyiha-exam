import { Injectable } from '@nestjs/common';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class MovieFilesService {
  constructor(@InjectModel(MovieFile) private movieFileService:typeof MovieFile){}
  create(createMovieFileDto: CreateMovieFileDto) {
    return 'This action adds a new movieFile';
  }

  async findAll() {
    let data = await this.movieFileService.findAll({
      include:[{
        model:Movie,
        include:[User]
      }
      ]
    })

    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} movieFile`;
  }

  update(id: number, updateMovieFileDto: UpdateMovieFileDto) {
    return `This action updates a #${id} movieFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieFile`;
  }
}
