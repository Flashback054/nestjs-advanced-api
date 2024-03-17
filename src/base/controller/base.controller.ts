import { ObjectLiteral } from 'typeorm';
import { BaseControllerInterface } from './i.base.controller';
import BaseService from '../service/base.service';
import { Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ID } from 'src/types/common.type';

abstract class BaseController<
  T extends ObjectLiteral,
  CreateDTO = T,
  UpdateDTO = T,
  QueryDTO = any,
> implements BaseControllerInterface<T, CreateDTO, UpdateDTO, QueryDTO>
{
  constructor(protected service: BaseService<T>) {}

  @Get()
  async getAll(@Query() query: QueryDTO): Promise<T[]> {
    const result = await this.service.findAll(query as object);
    return result.data;
  }

  @Get(':id')
  async getOneById(@Param('id') id: ID): Promise<T> {
    return await this.service.findOneById(id);
  }

  @Post()
  async create(body: any): Promise<T | T[]> {
    return await this.service.create(body);
  }

  @Patch(':id')
  async update(id: string, body: any): Promise<T> {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}

export default BaseController;
