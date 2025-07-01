import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { CreateWatchHistoryDto } from './dto/create-watch_history.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@ApiTags("Watch History")
@Controller('api/watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post("create")
  @UseGuards(AuthGuard,PermissionGuard)
  UpdateWatchHistory(@Body() payload:CreateWatchHistoryDto,@Req() req:Request){
    return this.watchHistoryService.updateWatchHistory(payload,req["user"].id)
  }

  @Get("all")
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.watchHistoryService.findAll();
  }


}
