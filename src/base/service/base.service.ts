import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { BaseServiceInterface } from './i.base.service';
import { FindAllResponse, ID } from 'src/types/common.type';

@Injectable()
abstract class BaseService<T extends ObjectLiteral>
  implements BaseServiceInterface<T>
{
  constructor(protected repository: Repository<T>) {}

  async create(item: any): Promise<T | T[]> {
    const newItem = this.repository.create(item);
    return await this.repository.save(newItem);
  }
  async update(id: ID, item: Partial<T>): Promise<T> {
    const updatedResult = await this.repository.update(id, item);
    const updatedItem = updatedResult.raw[0];

    if (updatedItem) {
      return updatedItem;
    }

    throw new HttpException(
      `Item with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
  async delete(id: ID): Promise<boolean> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected > 0) {
      return true;
    }
    throw new HttpException(
      `Item with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
  async findAll(options?: object): Promise<FindAllResponse<T>> {
    const items = await this.repository.find(options);
    const total = items.length;

    return {
      data: items,
      total,
    };
  }
  async findOneById(id: ID): Promise<T> {
    const item = await this.repository.findOne({
      where: { id } as any as FindOptionsWhere<T>,
    });

    if (item) {
      return item;
    }

    throw new HttpException(
      `Item with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(options: object): Promise<T> {
    const item = await this.repository.findOne(options);
    return item;
  }
}

export default BaseService;
