import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import {DeleteResult, Raw, Repository} from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
      @InjectRepository(Category)
      private repository: Repository<Category>
  ) {
  }
  async save(category: Category): Promise<Category> {
    return this.repository.save(category);
  }

  async all(): Promise<Category[]> {
    return this.repository.find({ order: { label: 'ASC' }});
  }

  async findByLabel(label: string): Promise<Category> {
    return this.repository.findOne({
      where: { label: Raw(alias => `LOWER(${alias}) = '${label.toLowerCase()}'`) } ,
    });
  }

  async findById(id: string): Promise<Category> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<number> {
    const query = await this.repository.delete(id);

    return query.affected;
  }

}
