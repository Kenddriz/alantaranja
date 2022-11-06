import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "./message.entity";
import { Repository } from "typeorm";
import {PaginationInput} from "../shared/shared.input";
import {paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class MessageService {
  constructor(
      @InjectRepository(Message)
      private repository: Repository<Message>,
  ) {}

  async save(message: Message): Promise<Message> {
    return this.repository.save(message);
  }

  async findOne(id: string): Promise<Message> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<number> {
    const query = await this.repository.delete(id);
    return query.affected;
  }

  async paginate(input: PaginationInput): Promise<Pagination<Message>> {

    const query = this.repository
        .createQueryBuilder()
        .orderBy('created_at', 'DESC');
    return paginate<Message>(query, input);
  }

  async findByByTopic(topicId: string, responseOnly = false): Promise<Message[]> {
    const query = this.repository.createQueryBuilder()
        .where('topic_id = :topicId', { topicId });

    if(responseOnly)query.andWhere('message_id IS NULL');

    return query.getMany();
  }

  async findView(userId: number, topicId: string): Promise<Message> {
    return this.repository
        .createQueryBuilder()
        .where('user_id = :userId', { userId })
        .andWhere('topic_id = :topicId', { topicId })
        .getOne();
  }

}
