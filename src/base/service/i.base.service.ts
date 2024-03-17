import { FindAllResponse } from 'src/types/common.type';
import { ID } from 'src/types/common.type';

export interface Write<T> {
  create(item: T | any): Promise<T | T[]>;
  update(id: ID, item: Partial<T>): Promise<T>;
  delete(id: ID): Promise<boolean>;
}

export interface Read<T> {
  findAll(options?: object): Promise<FindAllResponse<T>>;
  findOne(options: object): Promise<T>;
  findOneById(id: ID): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
