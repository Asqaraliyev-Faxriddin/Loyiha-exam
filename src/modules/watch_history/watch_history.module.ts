import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch_history.model';
import { PermissionGuard } from 'src/core/guards/role-guard';
import { Permission } from 'src/core/models/permission.model';

@Module({
  imports:[SequelizeModule.forFeature([WatchHistory,Permission])],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService,PermissionGuard],
})
export class WatchHistoryModule {}
 