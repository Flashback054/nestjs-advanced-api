import { ID } from 'src/types/common.type';

export interface BaseControllerInterface<T, CreateDTO, UpdateDTO, QueryDTO> {
  getAll(query: QueryDTO): Promise<T[]>;
  getOneById(id: ID): Promise<T>;

  create(body: CreateDTO): Promise<T | T[]>;
  update(id: ID, body: UpdateDTO): Promise<T>;
  delete(id: ID): Promise<void | T>;
}
