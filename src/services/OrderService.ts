import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order_CreateDto } from '@scm/dtos/Order_CreateDto';
import { Customer } from '@scm/entities/customer.entity';
import { Order } from '@scm/entities/order.entity';
import { OrderItem } from '@scm/entities/order_item.entity';
import { Product } from '@scm/entities/product.entity';
import { User } from '@scm/entities/user.entity';
import { Warehouse } from '@scm/entities/warehouse.entity';
import { WarehouseProduct } from '@scm/entities/warehouse_product.entity';
import PDFDocument from 'pdfkit';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    @InjectRepository(WarehouseProduct) private readonly warehouseProductRepository: Repository<WarehouseProduct>,
    @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  async listOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer', 'items'], withDeleted: false });
  }

  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['customer', 'items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async createOrder(orderDto: Order_CreateDto): Promise<Order> {
    const { customerId, name, remark, status, items } = orderDto;

    const customer = await this.customerRepository.findOne({ where: { id: customerId }, withDeleted: false });

    if (!customer) {
      throw new NotFoundException('Product not found');
    }

    const createdBy = await this.userRepository.findOne({
      where: {},
      withDeleted: false,
    });

    const order = this.orderRepository.create({
      customer,
      name,
      remark,
      status: 'DRAFT',
      createdBy,
      items: [],
    });

    const orderEntity = await this.orderRepository.save(order);
    let totalPrice = 0;
    for (const item of orderDto.items) {
      const product = await this.warehouseProductRepository.findOne({ where: { id: item.warehouseProductId }, relations: ['product'], withDeleted: false });
      const orderItem = this.orderItemRepository.create({
        order: orderEntity,
        product: product,
        quantity: item.quantity,
      });
      totalPrice += product.product.unitPrice * item.quantity;
      orderEntity.items.push(await this.orderItemRepository.save(orderItem));
    }

    orderEntity.total = totalPrice;
    await this.orderRepository.save(orderEntity);

    return orderEntity;
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
    // pdfDoc.text(`Product Name: ${order.product.name}`);
    // pdfDoc.text(`Warehouse Name: ${order.warehouse.name}`);
    // pdfDoc.text(`Quantity in Paper: ${order.quantityInPaper}`);
    // pdfDoc.text(`Quantity in Reality: ${order.quantityInReality}`);
    // pdfDoc.text(`Unit Price: ${order.unitPrice}`);
    // pdfDoc.text(`Total Price: ${order.totalPrice}`);
    // pdfDoc.text(`Import Date: ${order.importDate}`);

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

  async deleteOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId }, withDeleted: false });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await this.orderRepository.softRemove(order);
  }
}
