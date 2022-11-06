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

  async paginate(input: PaginationInput): Promise<Pagination<Topic>> {

    input.keyword = `%${input.keyword}%`;
    const { from, to, keyword, ...res } = input;

    const query = this.repository
        .createQueryBuilder();
    query.where(new Brackets(q => {
      q.where('title ILIKE :keyword', { keyword });
      q.orWhere('body ILIKE :keyword', { keyword })
    }));
    query.orderBy(from, to as any);
    return paginate<Topic>(query, res);
  }
}
