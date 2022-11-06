import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Family} from "./family.entity";
import {Brackets, Repository, WhereExpressionBuilder} from "typeorm";

@Injectable()
export class FamilyService {
  constructor(
      @InjectRepository(Family)
      private repository: Repository<Family>
  ) {}

  async save(family: Family): Promise<Family> {
      return this.repository.save(family);
  }

  async findOneById(id: string): Promise<Family> {
      return this.repository.findOneBy( { id });
  }

  async remove(family: Family): Promise<Family> {
      return this.repository.remove(family);
  }

  async check(categoryId: string, parentId: string, reverse = true): Promise<Family> {
    const query = this.repository.createQueryBuilder()
        .where(new Brackets(q => {
          q.where('category_id = :categoryId', { categoryId })
          q.andWhere(`parent_id ${parentId ? '= :parentId' : 'IS NULL'}`, { parentId })
        }));
    if(reverse) {
        query.orWhere(new Brackets((q) => {
            q.where('category_id = :parentId', { parentId })
            q.andWhere('parent_id = :categoryId', { categoryId })
        }))
    }
    return query.getOne();
  }

    async all(): Promise<Family[]> {
        return this.repository.find();
    }
}
