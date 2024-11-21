import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from '@scm/services/OrderService';
import { Order } from '@scm/entities/order.entity';
import { Order_CreateDto } from '../dtos/Order_CreateDto';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  async create(@Body() order: Order_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.orderService.createOrder(order));
  }

  @Put('/:id/confirm')
  async confirm(@Param('id') id: number, @Req() req, @Res() res) {
    const order = await this.orderService.confirmOrder(id);
    return res.status(HttpStatus.OK).json(order);
  }

  @Get('/:id/pdf')
  async printOrderPdf(@Param('id') id: number, @Req() req, @Res() res) {
    const pdfBuffer = await this.orderService.printOrderPdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  }
}
