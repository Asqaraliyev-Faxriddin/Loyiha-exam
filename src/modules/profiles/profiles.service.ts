import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/core/models/profiles.model';
import { User } from 'src/core/models/user.model';
import * as path from "path"
import * as fs from "fs"
import { deleteFile } from 'src/common/utils/delete.file';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileService: typeof Profile,
  @InjectModel(User) private usermodel: typeof User
) {}

  async create(createProfileDto: Required<CreateProfileDto>,avatar_url:string,user_id:string) {
    const status = await this.profileService.findOne({
      where: { user_id: user_id },
    });

    if (status) {
      throw new ConflictException("Ushbu foydalanuvchining profili allaqachon mavjud");
    }

    const data = await this.profileService.create({...createProfileDto,avatar_url,user_id});
    return {
      message: "Profil yaratildi",
      data,
    };
  }

  async findAll() {
    const data = await this.profileService.findAll({
      include: [{ model: User, as: 'mainProfile' }],
    });
    return data;
  }

  async findOne(id: string,user_id:string) {

    let olduser = await this.usermodel.findOne({where:{id:user_id}})
    if(!olduser) throw new NotFoundException("user not found")

    const data = await this.profileService.findByPk(id, {
      include: [{ model: User, as: 'mainProfile' }],
    });
    if (!data) throw new NotFoundException("Profil topilmadi");

    if(data.user_id != olduser.id) throw new BadRequestException("hamma ozini profilini update qiladi.")


    return data;
  } 

  async update(id: string, updateProfileDto: UpdateProfileDto, file: Express.Multer.File, user_id: string) {
    const data = await this.profileService.findByPk(id);
    if (!data) throw new NotFoundException("Profil topilmadi");
  
    const user = await this.usermodel.findOne({ where: { id: user_id } });
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");
  
    if(data.user_id != user.id) throw new BadRequestException("hamma ozini profilini update qiladi.")

    const payload: any = { ...updateProfileDto };
  
    if (file) {

        await deleteFile(`uploads/avatar_url/${data.dataValues.avatar_url}`);
      
      payload.avatar_url = file.filename;
    }
  
    await this.profileService.update(payload, { where: { id } });
  
    return {
      message: "Profil yangilandi",
      path:`uploads/avatar_url"${data.dataValues.avatar_url}`,
      data: await this.profileService.findByPk(id),
    };
  }
  

  async remove(id: string) {
    const profile = await this.profileService.findOne({where:{id}});
    if (!profile) throw new NotFoundException("Profil topilmadi");
  
    const avatarFile = profile.avatar_url;
    const filePath = path.join(process.cwd(),'uploads', 'avatar_url', avatarFile);
  
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  
    const count = await this.profileService.destroy({ where: { id } });
    if (!count) throw new NotFoundException("Profil topilmadi");
  
    return {
      message: "Profil o'chirildi",
    };
  }
}
