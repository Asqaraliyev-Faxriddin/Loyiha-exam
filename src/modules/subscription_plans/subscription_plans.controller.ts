import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription_plans.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription_plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription_plan.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';


@ApiBearerAuth()
@ApiTags("Subcription Plan")
@Controller('api/subscription-plans')
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @Post("create")
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  create(@Body() payload: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(payload);
  }

  @Get("all")
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard,)
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: "SuperAdmin va Admin keyin User uchun" })
  @UseGuards(AuthGuard, )
  findOne(@Param('id') id: string) {
    return this.subscriptionPlansService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return this.subscriptionPlansService.update(id, updateSubscriptionPlanDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: "faqat Admin va SuperAdmin huquqi bor." })
  @UseGuards(AuthGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
