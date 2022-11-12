import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Payment} from "./payment.entity";
import {Brackets, Repository} from "typeorm";
import {PaginationInput} from "../shared/shared.input";
import {paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class PaymentService {
  constructor(
      @InjectRepository(Payment)
      private repository: Repository<Payment>
  ) {}
  async save(payment: Payment): Promise<Payment> {
    return this.repository.save(payment);
  }

  async findOneById(id: string): Promise<Payment> {
    return this.repository.findOneBy({ id });
  }

  async paginate(input: PaginationInput, userId = 0): Promise<Pagination<Payment>> {

      input.keyword = `%${input.keyword}%`;
    const { from, to, keyword, ...res } = input;

    const query = this.repository
        .createQueryBuilder('pay');

    if(keyword) {
      query.innerJoin('users', 'user', 'user.id = pay.user_id')
          .where(new Brackets(q => {
            q.where('user.phone LIKE :keyword', { keyword })
            q.orWhere('user.email ILIKE :keyword', { keyword });
            q.orWhere('user.first_name ILIKE :keyword', { keyword });
            q.orWhere('user.last_name ILIKE :keyword', { keyword });
          }))
    }

    if(userId && from) {
      if(keyword)query.andWhere('pay.user_id = :userId', { userId });
      else query.where('pay.user_id = :userId', { userId });
      query.andWhere('pay.created_at BETWEEN :from AND :to', { from, to });
    }

    else if(userId) {
      if(keyword)query.andWhere('pay.user_id = :userId', { userId });
      else query.where('pay.user_id = :userId', { userId });
    }

    else if(from) {
      if(keyword) query.andWhere('pay.created_at BETWEEN :from AND :to', { from, to })
      else query.where('pay.created_at BETWEEN :from AND :to', { from, to })
    }

    query.orderBy('pay.created_at', 'DESC');

    return paginate<Payment>(query, res);
  }

  async monthlyRevenue() {
    const year = new Date().getFullYear();
    return this.repository
      .createQueryBuilder('pay')
      .select('SUM(pay.amount)', 'amount')
      .addSelect('EXTRACT("MONTH" FROM pay.created_at)', 'month')
      .where('EXTRACT("YEAR" FROM pay.created_at) = :year', { year })
      .andWhere('pay.status = :status', { status: 'approved' })
      .groupBy('month')
      .getRawMany();
  }

  async statusStatistics() {
    const year = new Date().getFullYear();
    return this.repository
      .createQueryBuilder('pay')
      .select('COUNT(pay.id)', 'count')
      .addSelect('pay.status', 'status')
      .addSelect('SUM(pay.amount)', 'amount')
      .where('EXTRACT("YEAR" FROM pay.created_at) = :year', { year })
      .groupBy('pay.status')
      .getRawMany();
  }

  async salesRevenue(): Promise<number> {
    const query = await this.repository
        .createQueryBuilder('pay')
        .select('SUM(pay.amount)', 'amount')
        .getRawOne();

    return query?.amount || 0;
  }
}
