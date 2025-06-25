import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from 'src/core/models/profiles.model';
import { User } from 'src/core/models/user.model';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile) private profileService:typeof Profile){}
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  async findAll() {
    let data = await this.profileService.findAll({
      include:[
        {
          model:User,as: 'mainProfile' 
        }
      ]
    })
    return data 
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
