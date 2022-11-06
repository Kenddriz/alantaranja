import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Reaction} from "./reaction.entity";
import {DeleteResult, Repository} from "typeorm";
import {MessageReaction} from "../topic/types/topic-input";

@Injectable()
export class ReactionService {
  constructor(
      @InjectRepository(Reaction)
      private repository: Repository<Reaction>
  ) {}

  async save(reaction: Reaction): Promise<Reaction> {
    return this.repository.save(reaction);
  }

  async remove(userId: number, messageId: string): Promise<DeleteResult> {
    return this.repository.createQueryBuilder()
        .delete()
        .where('user_id = :userId', { userId })
        .andWhere('message_id = :messageId', { messageId })
        .execute();
  }

  async countByMessage(messageId: string): Promise<MessageReaction[]> {
    return this.repository.createQueryBuilder()
      .where('message_id = :messageId', { messageId })
      .select('COUNT(label)', 'value')
      .addSelect('label')
      .groupBy('label')
      .getRawMany();
  }

}
