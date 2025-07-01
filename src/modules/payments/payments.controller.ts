import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from 'src/core/guards/jwt-guard';
import { UserRole } from 'src/core/types/user';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionGuard } from 'src/core/guards/role-guard';


@ApiBearerAuth()
@ApiTags("Payment")
@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("create")
  @UseGuards(AuthGuard, )
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get("all")
  @UseGuards(AuthGuard, PermissionGuard)
  findAll() {
    return this.paymentsService.findAll();
  }


}
