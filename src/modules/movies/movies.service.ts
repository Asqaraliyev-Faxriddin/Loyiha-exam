import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "src/core/models/movies.model";
import { User } from "src/core/models/user.model";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieService: typeof Movie) {}

  async create(payload: CreateMovieDto, poster_url: string) {
    let slug = await this.movieService.findOne({where:{slug:payload.slug}})
    if(slug) throw new BadRequestException("slud already")
    const data = await this.movieService.create({ ...payload, poster_url });
    return {
      message: "Movie muvaffaqiyatli qo'shildi",
      data,
    };
  }

  async findAll() {
 
    let data = await this.movieService.findAll({
      include:[{
        model:Movie,
        include:[User]
      }
      ]
    })


    return data
  }

  async findOne(id: number) {
    const movie = await this.movieService.findByPk(id, {
      include: [User],
    });

    if (!movie) throw new NotFoundException("Movie topilmadi");
    const newViewCount = (movie.view_count || 0) + 1;

  await this.movieService.update(
    {  view_count: newViewCount },
    { where: { id } }
  );
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieService.findByPk(id);
    if (!movie) throw new NotFoundException("Movie topilmadi");

    await this.movieService.update(updateMovieDto, { where: { id } });

    return {
      message: "Movie yangilandi",
      update: updateMovieDto,
    };
  }

  async remove(id: string) {
    const deleted = await this.movieService.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException("Movie topilmadi");

    return {
      message: "Movie o'chirildi",
    };
  }
}
