import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Topic} from "./topic.entity";
import {Brackets, Repository} from "typeorm";
import {PaginationInput} from "../shared/shared.input";
import {paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class TopicService {
  constructor(
      @InjectRepository(Topic)
      private repository: Repository<Topic>,
  ) {}
  async save(subject: Topic): Promise<Topic> {
    return this.repository.save(subject);
  }

  async findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<number> {
    const query = await this.repository.delete(id);
    return query.affected;
  }

  async paginate(input: PaginationInput, userId: number): Promise<Pagination<Topic>> {

    input.keyword = `%${input.keyword}%`;
    const { from, to, keyword, ...res } = input;

    //filter only document I have access
    const query = this.repository
        .createQueryBuilder('topic')
        .innerJoin('payments', 'pay', 'pay.user_id = :userId',{ userId })
        .innerJoin('payment_documents', 'payDoc', 'pay.id = payDoc.payment_id')
        .where('payDoc.document_id = topic.document_id')
        .andWhere('pay.status = :status', { status: 'approved' })
        .andWhere('topic.title ILIKE :keyword', { keyword })
        .orderBy(`topic.${from}`, to as any);
    return paginate<Topic>(query, res);
  }
}
