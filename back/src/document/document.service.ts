import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Document} from "./document.entity";
import {Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {PaginationInput} from "../shared/shared.input";
import {DocumentsPaginationInput} from "./resolvers/document-paginate-resolver";

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

  async remove(doc: Document): Promise<Document> {
    return  this.repository.remove(doc);
  }

  async search(name: string, userId: number): Promise<Document[]> {
    name = `%${name}%`;
    return this.repository
        .createQueryBuilder('doc')
        .innerJoin('payments', 'pay', 'pay.user_id = :userId',{ userId })
        .innerJoin('payment_documents', 'payDoc', 'pay.id = payDoc.payment_id')
        .where('payDoc.document_id = doc.id')
        .andWhere('pay.status = :status', { status: 'approved' })
        .andWhere('doc.title ILIKE :name', { name })
        .limit(5)
        .getMany();
  }


  async paginate(input: DocumentsPaginationInput): Promise<Pagination<Document>> {

    const { from, to, userId, ...res } = input;

    const query = this.repository
        .createQueryBuilder();

    if(userId)query.where('user_id = :userId', { userId });

    if(from) {
      if(userId) query.andWhere('created_at BETWEEN :from AND :to', { from, to });
      else query.where('created_at BETWEEN :from AND :to', { from, to });
    }

    query.orderBy('created_at', 'ASC');

    return paginate<Document>(query, res);
  }

}
