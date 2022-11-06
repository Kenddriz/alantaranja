import {ResolveField, Resolver, Root} from "@nestjs/graphql";
import {Document} from "../document.entity";
import {FamilyService} from "../../family/family.service";
import {Family} from "../../family/family.entity";

@Resolver(() => Document)
export class DocumentFamilyFieldResolver {
    constructor(private familyService: FamilyService) {}

    @ResolveField(() => Family, { nullable: true })
    async family(@Root()document: Document): Promise<Family> {
        if(!document.familyId)return null;
        return this.familyService.findOneById(document.familyId);
    }
}