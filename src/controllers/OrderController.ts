import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from '@scm/services/OrderService';
import { Order_CreateDto } from '../dtos/Order_CreateDto';

@ApiTags('order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('/list')
  async list(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.orderService.listOrders());
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.orderService.getOrderById(id));
  }

  @Post('/')
  async create(@Body() order: Order_CreateDto, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.orderService.createOrder(order));
  }

  @Put('/:id/confirm')
  async confirm(@Param('id') id: number, @Req() req, @Res() res) {
    const order = await this.orderService.confirmOrder(id);
    return res.status(HttpStatus.OK).json(order);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(await this.orderService.deleteOrder(id));
  }

  @Get('/:id/pdf')
  async printOrderPdf(@Param('id') id: number, @Req() req, @Res() res) {
    const pdfBuffer = await this.orderService.printOrderPdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  }
}
