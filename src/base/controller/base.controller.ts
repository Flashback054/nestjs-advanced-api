import { AbstractValidationPipe } from '../validationPipe/validationPipe';
import {
  BaseControllerFactoryArguments,
  BaseControllerInterface,
} from './i.base.controller';
import BaseService from '../service/base.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Type,
  UsePipes,
} from '@nestjs/common';
import { ID } from 'src/types/common.type';

export function ControllerFactory<T, C = any, U = any, Q = any>(
  controllerFactoryArguments: BaseControllerFactoryArguments<C, U, Q>,
): Type<BaseControllerInterface<T, C, U, Q>> {
  const { createDto, updateDto, queryDto } = controllerFactoryArguments;

  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );
  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto },
  );
  class BaseController<T, CreateDTO = any, UpdateDTO = any, QueryDTO = any>
    implements BaseControllerInterface<T, CreateDTO, UpdateDTO, QueryDTO>
  {
    constructor(protected service: BaseService<T>) {}

    @Get()
    @UsePipes(queryPipe)
    async getAll(@Query() query: QueryDTO): Promise<T[]> {
      const result = await this.service.findAll(query as object);
      return result.data;
    }

    @Get(':id')
    async getOneById(@Param('id') id: ID): Promise<T> {
      return await this.service.findOneById(id);
    }

    @Post()
    @UsePipes(createPipe)
    async create(@Body() body: CreateDTO): Promise<T | T[]> {
      return await this.service.create(body);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    async update(@Param() id: ID, @Body() body: UpdateDTO): Promise<T> {
      return await this.service.update(id, body);
    }

    @Delete(':id')
    async delete(@Param() id: ID): Promise<void> {
      await this.service.delete(id);
    }
  }

  return BaseController;
}
