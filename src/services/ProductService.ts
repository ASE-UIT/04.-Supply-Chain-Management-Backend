import { MessageCode } from '@gstb/commons/MessageCode';
import { ApplicationException } from '@gstb/controllers/ExceptionController';
import { Product } from '@gstb/entities/product.entity'; // Adjust the import path according to your project structure
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  // view the list of products
  async viewProductList(): Promise<any> {
    try {
      const products = await this.productRepository.find();
      return {
        message: 'Product list retrieved successfully',
        data: products,
      };
    } catch (e) {
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        MessageCode.CANNOT_RETRIEVE_PRODUCTS,
      );
    }
  }

  // Method to delete a product by ID
  async deleteProduct(productId: number): Promise<any> {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!existingProduct) {
        throw new ApplicationException(
          HttpStatus.NOT_FOUND,
          MessageCode.PRODUCT_NOT_FOUND,
        );
      }

      await this.productRepository.delete(productId);
      return {
        message: 'Product deleted successfully',
      };
    } catch (e) {
      Logger.error('[Error] - ', e.message, null, null, true);
      throw new ApplicationException(
        HttpStatus.BAD_REQUEST,
        MessageCode.CANNOT_DELETE_PRODUCT,
      );
    }
  }
}
