import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Topic} from "../topic.entity";
import {Document} from "../../document/document.entity";
import {DocumentService} from "../../document/document.service";

@Resolver(() => Topic)
export class TopicDocumentFieldResolver {
    constructor(private documentService: DocumentService) {}

    @ResolveField(() => Document, { nullable: true })
    async document(@Root()topic: Topic): Promise<Document> {
        return this.documentService.findById(topic.documentId);
    }
}