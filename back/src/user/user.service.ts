import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {Brackets, Repository} from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationInput } from '../shared/shared.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,

  ) {}

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async getAdmin(): Promise<User> {
    return this.repository.findOne({ where: { role: 0 } });
  }

  async findOneById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }

  async paginate(
    input: PaginationInput,
  ): Promise<Pagination<User>> {
    let { keyword,from, to, ...res } = input;
    keyword = `%${keyword}%`;
    const query = this.repository
      .createQueryBuilder()
        .where('role <> 0')
        .andWhere(new Brackets(q => {
           q.where('first_name LIKE :keyword', { keyword })
            .orWhere('phone LIKE :keyword', { keyword })
            .orWhere('email LIKE :keyword', { keyword });
        }));
    if(from)query.andWhere('created_at BETWEEN :from AND :to', { from, to });

    query.orderBy('created_at', 'DESC');

    return paginate<User>(query, res);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
