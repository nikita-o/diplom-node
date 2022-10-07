import { User } from '../../../database/schemas/user.schema';
import { ISearchUserParams } from './search-user-params.interface';

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: ISearchUserParams): Promise<User[]>;
}
