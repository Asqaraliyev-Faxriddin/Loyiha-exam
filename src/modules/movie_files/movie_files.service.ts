import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieFile } from 'src/core/models/movie_files.model';
import { Movie } from 'src/core/models/movies.model';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';
import * as fs from 'fs';
import * as path from 'path';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { deleteFile } from 'src/common/utils/delete.file';
import { User } from 'src/core/models/user.model';
import { Model } from 'sequelize';
import { paramdto } from './dto/create-movie_file.dto';

@Injectable()
export class MovieFilesService {
  constructor(
    @InjectModel(MovieFile) private moviefilemodel: typeof MovieFile,
    @InjectModel(Movie) private moviemodel: typeof Movie,
    @InjectModel(UserSubscription) private userSubcriptionmodel: typeof UserSubscription,
    @InjectModel(WatchHistory) private watchHistoryModel: typeof WatchHistory,
    @InjectModel(User) private usermodel: typeof User,


    
  ) {}

  async create(payload: any, file_url: string) {
    let movie = await this.moviemodel.findByPk(payload.movie_id);
    if (!movie) throw new NotFoundException('Kino topilmadi');

    let data = await this.moviefilemodel.create({ ...payload, file_url });
    return { message: "Kino fayli qo'shildi", data };
  }

  async findAll(userId: string, role: string) {
    let isAdmin = role === 'ADMIN' || role === 'SUPERADMIN';
  
    let data = await this.moviefilemodel.findAll({
      include: [{ model: Movie }],
    });
  
    if (isAdmin) return data;
  
    let subscription = await this.userSubcriptionmodel.findOne({
      where: { user_id: userId, status: 'active' }
    });
  
    let filtered = data.filter((item: any) => {
      let movie = item.movie;
      if (!movie) return false;
  
      if (movie.subscription_type === 'premium') {
        return subscription; 
      }
  
      return true; 
    });
  
    return filtered;
  }
  
  async findOne(id: string, userId: string, role: string) {
    if(id.length!==36) throw new BadRequestException("UUID required")

let subcriptionuser = await this.userSubcriptionmodel.findOne({where:{user_id:userId}})    

let data:any = await this.moviefilemodel.findOne({
    include:[
      {model:Movie}
    ],
     where:{
      id
      }
    })
console.log(data);

    let type = subcriptionuser?.status || "pending_payment"

    if(data.dataValues?.movie.subscription_type == "premium"){
    if(role == "SUPERADMIN" || role == "ADMIN" || type == "active"){

      return data
  

    } else{
      return {message:"siz premium sotib oling"}
   
    }

  }


return data.dataValues

  

  }
  
  
  


  async remove(id: string) {
    let file = await this.moviefilemodel.findByPk(id);
    if (!file) throw new NotFoundException('Kino fayli topilmadi');

    let filePath = path.join(process.cwd(), 'uploads', 'files', file.file_url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await this.moviefilemodel.destroy({ where: { id } });
    return { message: "Kino fayli o'chirildi" };
  }

  async update(id: string, updateProfileDto: UpdateMovieFileDto, file: Express.Multer.File, user_id: string) {
    let data = await this.moviefilemodel.findByPk(id);
    if (!data) throw new NotFoundException("movie topilmadi");
  
    let user = await this.usermodel.findOne({ where: { id: user_id } });
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");
  
    let payload: any = { ...updateProfileDto };
  
    if (file) {

        await deleteFile(`uploads/files/${data.dataValues.avatar_url}`);
      
      payload.avatar_url = file.filename;
    }
  
    await this.moviefilemodel.update(payload, { where: { id } });
  
    return {
      message: "movie yangilandi",
      path:`uploads/avatar_url"${data.dataValues.avatar_url}`,
      data: await this.moviefilemodel.findByPk(id),
    };
  }
  

}
