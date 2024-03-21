import { ID } from 'src/types/common.type';
import { Type } from '@nestjs/common';

export interface BaseControllerInterface<T, CreateDTO, UpdateDTO, QueryDTO> {
  getAll(query: QueryDTO): Promise<T[]>;
  getOneById(id: ID): Promise<T>;

  create(body: CreateDTO): Promise<T | T[]>;
  update(id: ID, body: UpdateDTO): Promise<T>;
  delete(id: ID): Promise<void | T>;
}

export interface BaseControllerFactoryArguments<C, U, Q> {
  createDto?: Type<C>;
  updateDto?: Type<U>;
  queryDto?: Type<Q>;
}
