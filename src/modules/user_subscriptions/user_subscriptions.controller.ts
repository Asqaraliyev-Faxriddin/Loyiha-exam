import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';

@ApiBearerAuth()
@ApiTags("User Subscription")
@Controller('api/user-subscriptions')
export class UserSubscriptionsController {
  constructor(private readonly userSubscriptionsService: UserSubscriptionsService) {}

  @Post("create")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() createUserSubscriptionDto: CreateUserSubscriptionDto,@Req() req:Request) {
    return this.userSubscriptionsService.create(createUserSubscriptionDto,req["user"].id);
  }

  @Get("all") 
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard,)
  findOne(@Param('id') id:string ,@Req() req:Request) {
    let user_id = req["user"].id
    return this.userSubscriptionsService.findOne(id,user_id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  update(@Param('id') id: string, @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto,@Req() req:Request) {
    let user_id = req["user"].id

    return this.userSubscriptionsService.update(id, updateUserSubscriptionDto,user_id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  remove(@Param('id') id: string,@Req() req:Request) {
    let user_id = req["user"].id
    return this.userSubscriptionsService.remove(id,user_id);
  }
}
