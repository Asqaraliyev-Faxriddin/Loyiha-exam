import {CanActivate,ExecutionContext,ForbiddenException,Injectable,} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from 'src/core/models/permission.model';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'SUPERADMIN') {
      return true;
    }

    if (user.role === 'ADMIN') {
      const method = request.method;

      const permission = await this.permissionModel.findOne({
        where: { user_id: user.id },
      });

      if (!permission) {
        throw new ForbiddenException('sizning admin siz lekin sizga birorta ham permission berilmagan');
      }

      const hasPermission =
        (method === 'GET' && permission.dataValues.read) ||
        (method === 'POST' && permission.dataValues.write) ||
        (method === 'PATCH' && permission.dataValues.updated) ||
        (method === 'DELETE' && permission.dataValues.delete);

      if (!hasPermission) {
        throw new ForbiddenException(`Sizda ${method} methodiga ruxsat yo'q`);
      }

      return true;
    }

    throw new ForbiddenException('Faqat ADMIN va SUPERADMIN ruxsat oladi');
  }
}
