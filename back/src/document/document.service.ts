import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Document} from "./document.entity";
import {ILike, Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {PaginationInput} from "../shared/shared.input";

@Injectable()
export class DocumentService {
  constructor(
      @InjectRepository(Document)
      private repository: Repository<Document>
  ) {
  }
  async save(document: Document): Promise<Document> {
    return this.repository.save(document);
  }

  async findById(id: string): Promise<Document> {
    return this.repository.findOneBy({ id });
  }

  async search(name: string): Promise<Document[]> {
    return this.repository.find({
      where: {
        title: ILike(`%${name}%`),
      },
      take: 5,
    });
  }


  async paginate(input: PaginationInput): Promise<Pagination<Document>> {

    const { from, to, ...res } = input;

    const query = this.repository
        .createQueryBuilder();
    if(from) {
      query.where('created_at BETWEEN :from AND :to', { from, to })
    }
    query.orderBy('created_at', 'ASC');
    return paginate<Document>(query, res);
  }

}
