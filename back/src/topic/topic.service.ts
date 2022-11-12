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
        .leftJoin('payments', 'pay', 'pay.user_id = :userId',{ userId })
        .leftJoin('payment_documents', 'payDoc', 'pay.id = payDoc.payment_id')
        .leftJoin('documents', 'doc', 'doc.id = topic.document_id')
        .where(new Brackets(query => {
          query.where('pay.status = :status AND doc.id = payDoc.document_id', { status: 'approved' })
          query.orWhere('topic.user_id = :userId',{ userId })
          query.orWhere('doc.user_id = :userId',{ userId })
        }))
        .andWhere('topic.title ILIKE :keyword', { keyword })
        .orderBy(`topic.${from}`, to as any);
    return paginate<Topic>(query, res);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
