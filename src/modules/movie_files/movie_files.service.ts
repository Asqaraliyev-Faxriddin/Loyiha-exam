import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Movie } from 'src/core/models/movies.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class MovieFilesService {
  constructor(
    @InjectModel(MovieFile) private movieFileService: typeof MovieFile,
    @InjectModel(Movie) private movieModel: typeof Movie
  ) {}

  async create(payload: Required<CreateMovieFileDto>, file_url: string) {

    const movie = await this.movieModel.findByPk(payload.movie_id);
    if (!movie) throw new NotFoundException('Movie topilmadi');

    const data = await this.movieFileService.create({
      ...payload,
      file_url,
    });

    return {
      message: "Movie file qo'shildi",
      data,
    };
  }

  async findAll() {
    return await this.movieFileService.findAll({
      include: [
        {
          model: Movie,
          include: [User],
        },
      ],
    });
  }

  async findOne(id: string) {
    const data = await this.movieFileService.findByPk(id, {
      include: [{ model: Movie }],
    });

    if (!data) throw new NotFoundException("Movie file topilmadi");

    return data;
  }

  async update(id: string, payload: UpdateMovieFileDto) {
    const found = await this.movieFileService.findByPk(id);
    if (!found) throw new NotFoundException("Movie file topilmadi");

    await this.movieFileService.update(payload, { where: { id } });

    return {
      message: "Movie file yangilandi",
      data: payload,
    };
  }

  async remove(id: string) {
    const deleted = await this.movieFileService.destroy({ where: { id } });

    if (!deleted) throw new NotFoundException("Movie file topilmadi");

    return {
      message: "Movie file o'chirildi",
    };
  }
}
