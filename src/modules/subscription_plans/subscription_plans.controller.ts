import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SubscriptionPlansService } from './subscription_plans.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription_plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription_plan.dto';

@Controller('api/subscription-plans')
export class SubscriptionPlansController {
  constructor(private readonly subscriptionPlansService: SubscriptionPlansService) {}

  @Post()
  create(@Body() payload: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(payload);
  }

  @Get("all")
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPlansService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return this.subscriptionPlansService.update(id, updateSubscriptionPlanDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
