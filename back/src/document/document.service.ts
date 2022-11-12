import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Document} from "./document.entity";
import {Brackets, Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {PaginationInput} from "../shared/shared.input";
import {DocumentsPaginationInput} from "./resolvers/document-paginate-resolver";

@Injectable()
export class DocumentService {
  constructor(
      @InjectRepository(Document)
      private repository: Repository<Document>
  ) {}
  async save(document: Document): Promise<Document> {
    return this.repository.save(document);
  }

  async findById(id: string): Promise<Document> {
    return this.repository.findOneBy({ id });
  }

  async remove(doc: Document): Promise<Document> {
    return  this.repository.remove(doc);
  }

  async search(name: string, userId: number): Promise<Document[]> {
    name = `%${name}%`;
    return this.repository
        .createQueryBuilder('doc')
        .leftJoin('payments', 'pay', 'pay.user_id = :userId',{ userId })
        .leftJoin('payment_documents', 'payDoc', 'pay.id = payDoc.payment_id')
        .where(new Brackets(query => {
          query.where('pay.status = :status AND doc.id = payDoc.document_id', { status: 'approved' })
          query.orWhere('doc.user_id = :userId',{ userId })
        }))
        .andWhere('doc.title ILIKE :name', { name })
        .limit(5)
        .getMany();
  }


  async paginate(input: DocumentsPaginationInput): Promise<Pagination<Document>> {

    input.keyword = `%${input.keyword}%`;

    const { from, to, keyword, userId, hidden, categories, ...res } = input;

    const query = this.repository
        .createQueryBuilder()
        .where(`hidden IN(:...hidden)`, { hidden })
        .andWhere('title LIKE :keyword', { keyword })

    if(categories.length) query.andWhere(`family_id IN(:...categories)`, { categories });

    if(userId)query.andWhere('user_id = :userId', { userId });

    if(from) {
      query.andWhere('created_at BETWEEN :from AND :to', { from, to });
    }

    query.orderBy('created_at', 'ASC');

    return paginate<Document>(query, res);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

}
