import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto, PermissionDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { Permission } from 'src/core/models/permission.model';
import { UserRole } from 'src/core/types/user';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(@InjectModel(User) private usermodel :typeof User,
              @InjectModel(Permission) private permisisonModel: typeof Permission

){}
async create(id: string, payload: Required<PermissionDto>) {
  const olduser = await this.usermodel.findOne({ where: { id, role: "ADMIN" } });
  if (!olduser) throw new NotFoundException("User not found");

  console.log(olduser.dataValues.role);
    
  if (olduser.dataValues.role !== "ADMIN" ) throw new BadRequestException("Faqat ADMIN foydalanuvchiga permission qo'shiladi");

  let permisiontekshirish = await this.permisisonModel.findOne({ where: { user_id: id } });

  if (permisiontekshirish) {
    console.log("salomd");
    
    if (payload.read !== undefined) permisiontekshirish.dataValues.read = payload.read;
    if (payload.write !== undefined) permisiontekshirish.dataValues.write = payload.write;
    if (payload.updated !== undefined) permisiontekshirish.dataValues.updated = payload.updated;
    if (payload.delete !== undefined) permisiontekshirish.dataValues.delete = payload.delete;
  
    await permisiontekshirish.save();
    return permisiontekshirish;
  }

  let newPermission = await this.permisisonModel.create({
    user_id: id,
    read: payload.read,
    write: payload.write,
    updated: payload.updated,
    delete: payload.delete,
  });

  return newPermission;
}

  async findAll() {
    let data = await this.permisisonModel.findAll({
      include:[
        {
        model:User
        }
      ]
    })

    return data
  }

  async findOne(id: string) {

    let data = await this.permisisonModel.findAll({
      include:[
        {
        model:User
        }
      ],
      where:{
        id
      }
    })

    return data

  }

  async update(id: string, payload: PermissionDto) {

    let olduser = await this.usermodel.findOne({ where: { id, role: "ADMIN" } });
    
    if (!olduser) throw new NotFoundException("User not found");
  
    if (olduser.role !== "ADMIN") throw new BadRequestException("Faqat ADMIN foydalanuvchiga permission qo‘shiladi");
  
    let permisiontekshirish = await this.permisisonModel.findOne({ where: { user_id: id } });
  
    if (permisiontekshirish) {

      permisiontekshirish.read = payload.read ?? permisiontekshirish.read;
      permisiontekshirish.write = payload.write ?? permisiontekshirish.write;
      permisiontekshirish.updated = payload.updated ?? permisiontekshirish.updated;
      permisiontekshirish.delete = payload.delete ?? permisiontekshirish.delete;
  
      await permisiontekshirish.save();
      return permisiontekshirish;
    }
  

    return {message:"Admin not found"}

  }

  async remove(id: string) {

      const permission = await this.permisisonModel.findByPk(id);
      if (!permission) throw new NotFoundException('Permission not found');
    
      await permission.destroy();
    
      return { message: 'Permission deleted ' };
    
    
  }

  async AddAdmin(payload:CreateAdminDto){
    let user =  await this.usermodel.findOne({where:{username:payload.username}}) 
    let email =  await this.usermodel.findOne({where:{email:payload.email}}) 
   
    if(user ) throw new ConflictException("username already")
    if(email ) throw new ConflictException("email already")

    let hash = await bcrypt.hash(payload.password,10)

    let data = await this.usermodel.create({...payload,password:hash,role:UserRole.Admin})

    return {message:"Loginga o'tib sinab ko'ring...",data,}
}


async deleteAdmin(id:string){
 
  let data = await this.usermodel.destroy({where:{id,role:"ADMIN"}})
  if(!data) throw new NotFoundException("Admin not found")

  return {succase:true,message:"Admin o'chirildi"}
}

async updateAdmin(id:string,payload:Required<UpdateAdminDto>){
 
  let data = await this.usermodel.findOne({where:{id,role:"ADMIN"}})
  if(!data) throw new NotFoundException("Admin not found")

    let body = await this.usermodel.update(payload,{where:{id},returning:true})



  return body
}

async AdminAll(){
 
  let data = await this.usermodel.findAll(
 
    {
      where:
    {role:"ADMIN"}
  
  })
  

  return data


}


}
