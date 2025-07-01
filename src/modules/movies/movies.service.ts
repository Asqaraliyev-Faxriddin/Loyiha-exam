import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto, MovieQueryDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Movie } from "src/core/models/movies.model";
import { User } from "src/core/models/user.model";
import { Category } from "src/core/models/categories.model";
import { Op } from "sequelize";
import * as fs from "fs"
import * as path from "path"
import { deleteFile } from "src/common/utils/delete.file";

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie) private movieService: typeof Movie,
              @InjectModel(Category) private categoryModel: typeof Category,
              @InjectModel(User) private usermodel: typeof User,

) {}

  async create(payload: CreateMovieDto, poster_url: string) {
    let slug = await this.movieService.findOne({where:{slug:payload.slug}})
    if(slug) throw new BadRequestException("slud already")
    let data = await this.movieService.create({ ...payload, poster_url });
    return {
      message: "Movie muvaffaqiyatli qo'shildi",
      data,
    };
  }

  async findAll() {
    let data = await this.movieService.findAll({
      include:[{
        model:User
      }
      ]
    })


    return data
  }


  async findQueryAll(payload: Required<MovieQueryDto>) {
    let page = payload.page || 1;
    let limit = payload.limit || 20;
    let offset = (page - 1) * limit;
  
    let where: any = {};
  
    if (payload.search) {
      where.title = { [Op.iLike]: `%${payload.search}%` };
    }
  
    if (payload.subscription_type) {
      where.subscription_type = payload.subscription_type;
    }
  
    const movies = await this.movieService.findAll({
      where,
      limit,
      offset,
      include: [
        {
          model: Category,
          attributes: ['name'],
          through: { attributes: [] }, 
        },
      ],
    });
  
    const total = await this.movieService.count({ where });
  
    return {
      success: true,
      data: {
        movies,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }
  
  


  async update(id: string, updateProfileDto: UpdateMovieDto, file: Express.Multer.File, user_id: string) {
    const data = await this.movieService.findByPk(id);
    if (!data) throw new NotFoundException("movie topilmadi");
  
    const user = await this.usermodel.findOne({ where: { id: user_id } });
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");
  
    const payload: any = { ...updateProfileDto };
  
    if (file) {

        await deleteFile(`uploads/posters/${data.dataValues.avatar_url}`);
      
      payload.avatar_url = file.filename;
    }
  
    await this.movieService.update(payload, { where: { id } });
  
    return {
      message: "movie yangilandi",
      path:`uploads/avatar_url"${data.dataValues.avatar_url}`,
      data: await this.movieService.findByPk(id),
    };
  }
  



  async remove(id: string) {
    let deleted = await this.movieService.findByPk(id);

    if (!deleted) throw new NotFoundException("Movie file topilmadi");
    let poster = deleted.poster_url
    let filePath = path.join(process.cwd(),'uploads', 'posters', poster);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

 await this.movieService.destroy({where:{id}});

    return {
      message: "Movie  o'chirildi",
    };
  }
}

