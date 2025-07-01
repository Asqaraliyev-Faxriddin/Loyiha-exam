import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from 'src/core/models/profiles.model';
import { User } from 'src/core/models/user.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([Profile,User,Permission])],
  controllers: [ProfilesController],
  providers: [ProfilesService,PermissionGuard],

})
export class ProfilesModule {}
