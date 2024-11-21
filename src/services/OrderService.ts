import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@scm/entities/order.entity';
import { Product } from '@scm/entities/product.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import PDFDocument from 'pdfkit';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async createOrder(orderDto: {
    productId: number;
    warehouseId: number;
    quantityInPaper: number;
    quantityInReality: number;
    unitPrice: number;
  }): Promise<Order> {
    const { productId, warehouseId, quantityInPaper, quantityInReality, unitPrice } = orderDto;

    const product = await this.productRepository.findOne({ where: { id: productId } });
    const warehouse = await this.warehouseRepository.findOne({ where: { id: warehouseId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    const totalPrice = unitPrice * quantityInReality;

    const order = this.orderRepository.create({
      product,
      warehouse,
      quantityInPaper,
      quantityInReality,
      unitPrice,
      totalPrice,
      importDate: new Date(),
    });

    return await this.orderRepository.save(order);
  }

  async printOrderPdf(orderId: number): Promise<Buffer> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['product', 'warehouse'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const pdfDoc = new PDFDocument();
    const chunks: Buffer[] = [];

    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => Buffer.concat(chunks));

    pdfDoc.fontSize(16).text('Order Details', { align: 'center' });

    pdfDoc.fontSize(12).text(`Order ID: ${order.id}`);
    pdfDoc.text(`Product Name: ${order.product.name}`);
    pdfDoc.text(`Warehouse Name: ${order.warehouse.name}`);
    pdfDoc.text(`Quantity in Paper: ${order.quantityInPaper}`);
    pdfDoc.text(`Quantity in Reality: ${order.quantityInReality}`);
    pdfDoc.text(`Unit Price: ${order.unitPrice}`);
    pdfDoc.text(`Total Price: ${order.totalPrice}`);
    pdfDoc.text(`Import Date: ${order.importDate}`);

    pdfDoc.end();

    return Buffer.concat(chunks);
  }

  async confirmOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = 'CONFIRMED';
    return await this.orderRepository.save(order);
  }
}
